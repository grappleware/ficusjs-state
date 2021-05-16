import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createCustomElement('clear-button',
  withStore(store, {
    clear () {
      this.store.clear()
    },
    render () {
      return html`<button type="button" onclick=${this.clear}>Clear</button>`
    }
  })
)
