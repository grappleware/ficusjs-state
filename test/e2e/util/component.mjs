import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { createCustomElement as customElementCreator } from 'https://cdn.skypack.dev/@ficusjs/core'
import { withXStateService, withStateMachine, withStore, withLocalState, createAppState, createPersist, getAppState, withWorkerStore } from '../../../src/index.mjs'

function createCustomElement (tagName, options) {
  customElementCreator(tagName, { ...options, renderer })
}

function createComponentWithStateMachine (tagName, machine, options) {
  customElementCreator(tagName, withStateMachine(machine, { ...options, renderer }))
}

function createComponentWithXStateService (tagName, service, options) {
  customElementCreator(tagName, withXStateService(service, { ...options, renderer }))
}

const nothing = ''

export {
  createCustomElement,
  createComponentWithStateMachine,
  createComponentWithXStateService,
  withStore,
  createAppState,
  withLocalState,
  getAppState,
  withWorkerStore,
  createPersist,
  html,
  nothing
}
