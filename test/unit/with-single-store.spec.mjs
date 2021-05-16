import test from 'ava'
import sinon from 'sinon'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withStore } from '../../src/index.mjs'

test.beforeEach(t => {
  t.context = createWrapper(
    withStore({
      subscribe: sinon.stub().returns(() => {})
    }, {
      mounted: sinon.spy(),
      updated: sinon.spy(),
      removed: sinon.spy()
    })
  )
  sinon.spy(t.context, '_subscribeToStores')
  sinon.spy(t.context, '_unsubscribeFromStores')
})

test('create subscription', t => {
  t.truthy(t.context.store.subscribe.called)
})

test('mounted method', t => {
  t.context.mounted()
  t.truthy(t.context._subscribeToStores.called)
})

test('updated method', t => {
  t.context.updated()
  t.truthy(t.context._subscribeToStores.called)
})

test('removed method', t => {
  t.context.removed()
  t.truthy(t.context._unsubscribeFromStores.called)
})
