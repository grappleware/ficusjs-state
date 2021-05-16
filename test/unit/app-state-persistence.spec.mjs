import test from 'ava'
import sinon from 'sinon'
import { createAppState } from '../../src/app-state.mjs'

let store

test.beforeEach(t => {
  store = createAppState('test.store', {
    persist: {
      getState () {
        return {
          test: 'test',
          test2: 'test2'
        }
      },
      lastUpdated () {
        return -1
      },
      setState: sinon.spy(),
      removeState: sinon.spy()
    },
    initialState: {
      test: null,
      test2: null
    }
  })
})

test('initial state', t => {
  t.is(store.state.test, 'test')
  t.is(store.state.test2, 'test2')
})

test('direct assignment', t => {
  store.state.test2 = 'test3'
  t.truthy(store.persist.setState.called)
  t.truthy(store.persist.setState.calledWith({ test: 'test', test2: 'test3' }))
})

test('store change with setState', t => {
  store.setState(_ => ({ test2: 'test4' }))
  t.truthy(store.persist.setState.called)
  t.truthy(store.persist.setState.calledWith({ test: 'test', test2: 'test4' }))
})

test('clear store', t => {
  store.clear()
  t.truthy(store.persist.removeState.called)
})

test('store ttl', t => {
  const store = createAppState('test2.store', {
    ttl: 100,
    persist: {
      getState () {
        return {
          test: 'test',
          test2: 'test2'
        }
      },
      lastUpdated () {
        return -1
      },
      setState: sinon.spy(),
      removeState: sinon.spy()
    },
    initialState: {
      test: null,
      test2: null
    }
  })
  store.state.test2 = 'test3'
  return new Promise(resolve => {
    setTimeout(() => {
      t.is(store.state.test2, null)
      resolve()
    }, 200)
  })
})
