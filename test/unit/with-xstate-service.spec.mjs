import test from 'ava'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withXStateService } from '../../src/index.mjs'
import sinon from 'sinon'

test.beforeEach(t => {
  t.context = createWrapper(
    withXStateService({
      status: 'Idle',
      subscribe: sinon.stub().returns(sinon.spy()),
      start: sinon.spy(),
      stop: sinon.spy(),
      send: sinon.spy()
    }, {
      mounted: sinon.spy(),
      updated: sinon.spy(),
      removed: sinon.spy()
    })
  )
})

test('set-up subscription and start service', t => {
  t.truthy(t.context.service.subscribe.called)
  t.truthy(t.context.service.start.called)
})

test('send action', t => {
  t.context.send('LOADING')
  t.truthy(t.context.service.send.called)
  t.is(t.context.service.send.getCall(0).args[0], 'LOADING')
})

test('stop service', t => {
  t.context.service.status = 'Running'
  t.context.removed()
  t.truthy(t.context.service.stop.called)
})

test('stop and start service with mounted', t => {
  t.context.service.status = 'Running'
  t.context.removed()
  t.context.service.status = 'Stopped'
  t.context.mounted()
  t.truthy(t.context.service.start.called)
})

test('stop and start service with updated', t => {
  t.context.service.status = 'Running'
  t.context.removed()
  t.context.service.status = 'Stopped'
  t.context.updated()
  t.truthy(t.context.service.start.called)
})

test('start service with updated if already running', t => {
  t.context.service.status = 'Running'
  t.context.updated()
  t.truthy(t.context.service.start.called)
})

test('state changes', t => {
  let subscribeCallback
  const wrapper = createWrapper(
    withXStateService({
      status: 'Running',
      subscribe (callback) {
        subscribeCallback = callback
      },
      start () {},
      stop () {}
    }, {})
  )
  wrapper._processRender = sinon.spy()
  t.truthy(typeof subscribeCallback === 'function')
  subscribeCallback({ test: 'test' })
  t.truthy(wrapper._processRender.called)
})
