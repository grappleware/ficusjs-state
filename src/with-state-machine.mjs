import { createStateMachine } from './state-machine.mjs'

export function withStateMachine (stateMachineDefinition, options) {
  return {
    ...options,
    created () {
      this._stateMachineDefinition = stateMachineDefinition
      this._stateMachine = createStateMachine(stateMachineDefinition)
      this.initialState = this._stateMachine.initialState
      this.state = {
        context: {},
        matches (v) {
          return v === this.value
        },
        value: this.initialState
      }
      this.setState = (data, callback) => {
        if (!data || typeof data !== 'object') return
        const existingUpdated = this.updated
        if (callback) {
          this.updated = () => {
            callback.call(this)
            this.updated = existingUpdated || undefined
          }
        }
        this.status = 'transaction'
        for (const key in data) {
          if (key === 'value') {
            this.state[key] = data[key]
          } else if (!this.state.context[key] || (this.state.context[key] !== data[key])) {
            this.state.context[key] = data[key]
          }
        }
        this.status = 'render'
        this._processRender()
      }
      if (options.created) options.created.call(this)
    },
    send (event) {
      let eventType
      let eventPayload
      if (typeof event === 'string') {
        eventType = event
      } else {
        const { type, ...payload } = event
        eventType = type
        eventPayload = payload
      }
      const { value } = this.state
      const nextState = this._stateMachine.transition(value, eventType) || value
      const action = this._stateMachineDefinition.actions && this._stateMachineDefinition.actions[nextState]
        ? () => this._stateMachineDefinition.actions[nextState].call(this, eventPayload)
        : () => {}
      this.setState({ value: nextState }, action)
    }
  }
}
