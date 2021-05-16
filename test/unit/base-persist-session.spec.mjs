import test from 'ava'
import sinon from 'sinon'
import { createPersist } from '../../src/index.mjs'

let persist

test.beforeEach(t => {
  globalThis.sessionStorage = {
    setItem: sinon.spy(),
    getItem: sinon.spy(),
    removeItem: sinon.spy()
  }
  persist = createPersist('test')
})

test('set state', t => {
  persist.setState({ test: 'test' })
  t.is(globalThis.sessionStorage.setItem.callCount, 2)
  t.deepEqual(globalThis.sessionStorage.setItem.getCall(0).args, ['test:state', JSON.stringify({ test: 'test' })])
  t.is(globalThis.sessionStorage.setItem.getCall(1).args[0], 'test:lastUpdated')
})

test('set empty state', t => {
  persist.setState()
  t.truthy(globalThis.sessionStorage.removeItem.called)
  t.is(globalThis.sessionStorage.removeItem.getCall(0).args[0], 'test:state')
  t.is(globalThis.sessionStorage.removeItem.getCall(1).args[0], 'test:lastUpdated')
})

test('get state', t => {
  persist.getState()
  t.truthy(globalThis.sessionStorage.getItem.called)
  t.is(globalThis.sessionStorage.getItem.getCall(0).args[0], 'test:state')
})

test('get lastUpdated', t => {
  persist.lastUpdated()
  t.truthy(globalThis.sessionStorage.getItem.called)
  t.is(globalThis.sessionStorage.getItem.getCall(1).args[0], 'test:lastUpdated')
})
