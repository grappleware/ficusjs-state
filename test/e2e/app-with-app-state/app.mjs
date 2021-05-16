import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

createCustomElement('mock-app-with-store',
  withStore(store, {
    render () {
      return html`<div>
    <increment-button></increment-button>
    <clear-button></clear-button>
    <display-button></display-button>
      </div>`
    }
  })
)
