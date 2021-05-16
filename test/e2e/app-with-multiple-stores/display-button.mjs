import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createCustomElement(
  'display-button',
  withStore(store, {
    computed: {
      count () {
        return this.store.count.state.count
      }
    },
    render () {
      return html`<div>You have clicked ${this.count} times!</div>`
    }
  })
)
