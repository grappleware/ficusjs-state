import test from 'ava'
import { createStateMachine } from '../../src/index.mjs'

const machineSpec = {
  states: {
    idle: {
      on: {
        CLICK: 'loading'
      }
    },
    loading: {
      on: {
        RESOLVE: 'success',
        REJECT: 'error'
      }
    },
    success: {},
    error: {}
  }
}
let machine

test.before(t => {
  machine = createStateMachine(machineSpec)
})

test('initial state', t => {
  t.is(machine.initialState, 'idle')
})

test('transition from idle to loading', t => {
  const nextState = machine.transition('idle', 'CLICK')
  t.is(nextState, 'loading')
})

test('transition from loading to success', t => {
  const nextState = machine.transition('loading', 'RESOLVE')
  t.is(nextState, 'success')
})

test('transition from loading to error', t => {
  const nextState = machine.transition('loading', 'REJECT')
  t.is(nextState, 'error')
})
