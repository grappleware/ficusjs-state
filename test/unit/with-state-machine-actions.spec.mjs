import test from 'ava'
import sinon from 'sinon'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withStateMachine } from '../../src/index.mjs'

const stateMachineDefinition = {
  states: {
    idle: { on: { CLICK: 'loading' } },
    loading: { on: { RESOLVE: 'person', REJECT: 'error' } },
    person: { on: { CLICK: 'loading' } },
    error: { on: { CLICK: 'loading' } }
  },
  actions: {}
}

test.beforeEach(t => {
  t.context = createWrapper(
    withStateMachine(stateMachineDefinition, {
      updated: sinon.spy()
    })
  )
  sinon.spy(t.context, 'setState')
})

test('initial state', t => {
  t.truthy(t.context.state.matches('idle'))
})

test('send method to loading', t => {
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  t.context.send('CLICK')
  t.truthy(t.context.state.matches('loading'))
})

test('send data to loading', t => {
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  stateMachineDefinition.actions.loading = sinon.spy()
  t.context.send({ type: 'CLICK', name: 'Matt' })
  t.truthy(t.context.state.matches('loading'))
  t.truthy(stateMachineDefinition.actions.loading.called)
  t.deepEqual(stateMachineDefinition.actions.loading.getCall(0).args[0], { name: 'Matt' })
})

test('send method to person', t => {
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  stateMachineDefinition.actions.loading = function () {
    this.setState({ name: 'Matt' }, () => this.send('RESOLVE'))
  }
  t.context.send('CLICK')
  t.truthy(t.context.state.matches('person'))
  t.is(t.context.state.context.name, 'Matt')
})

test('send method to person setting the action name', t => {
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  stateMachineDefinition.states.idle.on.CLICK = {
    target: 'loading',
    action: 'anyActionName'
  }
  stateMachineDefinition.actions.anyActionName = function () {
    this.setState({ name: 'Matt' }, () => this.send('RESOLVE'))
  }
  t.context.send('CLICK')
  t.truthy(t.context.state.matches('person'))
  t.is(t.context.state.context.name, 'Matt')
  stateMachineDefinition.states.idle.on.CLICK = 'loading'
})

test('send method to error', t => {
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  stateMachineDefinition.actions.loading = function () {
    this.send('REJECT')
  }
  t.context.send('CLICK')
  t.truthy(t.context.state.matches('error'))
})
