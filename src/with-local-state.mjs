import { isPromise } from './util/is-promise.mjs'

export function withLocalState (options) {
  return {
    ...options,
    created () {
      // check the state
      if (options.state && typeof options.state !== 'function') throw new Error('State must be a function!')
      this._state = options.state || {}

      // Take whatever is passed and set it as a proxy in local state
      if (typeof this._state === 'function') {
        this._state = this._state.bind(this)()
      }
      this.state = this._monitorState(this._state)

      // set state method
      this.setState = (stateFn, callback) => {
        const setter = data => {
          if (!data || typeof data !== 'object') return
          const existingUpdated = this.updated
          if (callback) {
            this.updated = () => {
              callback()
              this.updated = existingUpdated || undefined
            }
          }
          this.status = 'transaction'
          for (const key in data) {
            if (!this.state[key] || (this.state[key] !== data[key])) this.state[key] = data[key]
          }
          this.status = 'render'
          this._processRender()
        }
        const res = stateFn(this.state)
        isPromise(res) ? res.then(setter) : setter(res)
      }

      if (options.created) options.created.call(this)
    },
    _monitorState (objectInstance) {
      const self = this

      return new Proxy(objectInstance, {
        set (obj, property, value) {
          // We don't want to do anything if there's no actual changes to make
          if (obj[property] === value) return true

          // Allow the value to be set with no dramas
          obj[property] = value

          // clear the computed cache
          self.computedCache = {}

          // Run the render processor now that there's changes
          if (self.status === 'render') self._processRender()

          return true
        }
      })
    }
  }
}
