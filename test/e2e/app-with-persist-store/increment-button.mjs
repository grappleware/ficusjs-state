import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createCustomElement(
  'increment-button',
  withStore(store, {
    increment () {
      this.store.increment(this.store.state.count + 1)
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>Increment</button>`
    }
  })
)
