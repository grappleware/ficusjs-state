import test from 'ava'
import sinon from 'sinon'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withStateMachine } from '../../src/index.mjs'

test.beforeEach(t => {
  t.context = createWrapper(
    withStateMachine({
      states: {
        inactive: { on: { TOGGLE: 'active' } },
        active: { on: { TOGGLE: 'inactive' } }
      }
    }, {
      mounted: sinon.spy(),
      updated: sinon.spy(),
      removed: sinon.spy()
    })
  )
  sinon.spy(t.context, 'setState')
})

test('initial state', t => {
  t.truthy(t.context.state.matches('inactive'))
})

test('send method', t => {
  t.context.send('TOGGLE')
  t.truthy(t.context.state.matches('active'))
})
