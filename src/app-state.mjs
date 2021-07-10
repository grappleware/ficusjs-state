import { createPersist } from './base-persist.mjs'
import { withStore } from './with-store.mjs'
import { Store } from './store.mjs'

/**
 * Function to create a store instance
 * @param {string} key
 * @param {object} options
 * @returns {Store}
 */
function createAppState (key, options) {
  let store = getAppState(key)
  if (store) return store
  store = new Store(options)
  globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
  globalThis.__ficusjs__.store = globalThis.__ficusjs__.store || {}
  globalThis.__ficusjs__.store[key] = store
  return store
}

/**
 * Function to retrieve a Store instance
 * @param {string} key
 * @returns {Store|undefined}
 */
function getAppState (key) {
  if (globalThis.__ficusjs__ && globalThis.__ficusjs__.store && globalThis.__ficusjs__.store[key]) {
    return globalThis.__ficusjs__.store[key]
  }
}

export { createAppState, getAppState, createPersist, withStore }
