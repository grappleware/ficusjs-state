import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createCustomElement(
  'increment-button',
  withStore(store, {
    increment () {
      this.store.count.increment(this.store.count.state.count + 1)
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>Increment</button>`
    }
  })
)
