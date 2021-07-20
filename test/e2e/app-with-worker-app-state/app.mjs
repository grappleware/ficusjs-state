import { html, createCustomElement } from '../util/component.mjs'
import './worker-store.mjs'

import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

createCustomElement('mock-app-with-store', {
  render () {
    return html`<div>
    <increment-button></increment-button>
    <clear-button></clear-button>
    <display-button></display-button>
      </div>`
  }
})
