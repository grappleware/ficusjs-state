export function withXStateService (service, options) {
  return {
    ...options,
    created () {
      this._setupService(service)
      if (options.created) options.created.call(this)
    },
    send (action) {
      this.service.send(action)
    },
    mounted () {
      this._startService()
      if (options.mounted) options.mounted.call(this)
    },
    updated () {
      this._startService()
      if (options.updated) options.updated.call(this)
    },
    removed () {
      this._stopService()
      if (options.removed) options.removed.call(this)
    },
    _setupService (service) {
      this.service = service
      this.subscription = service.subscribe(state => {
        this.state = state

        // clear the getter cache
        this.computedCache = {}

        // Run the render processor now that there's changes
        this._processRender()
      })
      this._startService()
    },
    _startService () {
      if (this.service && this.subscription && this.service.status !== 'Running') {
        this.service.start()
      }
    },
    _stopService () {
      if (this.service && this.subscription && this.service.status === 'Running') {
        this.service.stop()
      }
    }
  }
}
