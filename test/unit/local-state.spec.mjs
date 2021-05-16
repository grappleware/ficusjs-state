import test from 'ava'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withLocalState } from '../../src/index.mjs'

test.beforeEach(t => {
  t.context = createWrapper(
    withLocalState({
      state () {
        return {
          name: 'Matt',
          age: 40,
          sex: 'Male'
        }
      }
    })
  )
})

test('set-up local state', t => {
  t.is(t.context.state.name, 'Matt')
  t.is(t.context.state.age, 40)
  t.is(t.context.state.sex, 'Male')
})

test('direct assignment with no status does not trigger render', t => {
  t.context.state.name = 'Vikki'
  t.falsy(t.context._processRender.called)
})

test('direct assignment with status triggers render', t => {
  t.context.status = 'render'
  t.context.state.name = 'Jessica'
  t.truthy(t.context._processRender.called)
})

test('setState with single property triggers render', t => {
  t.context.setState(_ => ({
    name: 'Pete'
  }))
  t.truthy(t.context._processRender.called)
  t.is(t.context.state.name, 'Pete')
  t.is(t.context._processRender.callCount, 1)
})

test('setState with multiple properties triggers render', t => {
  t.context.setState(_ => ({
    name: 'Shirley',
    age: 30
  }))
  t.truthy(t.context._processRender.called)
  t.is(t.context._processRender.callCount, 1)
  t.is(t.context.state.name, 'Shirley')
})

test('setState with callback triggers update', t => {
  t.plan(1)
  t.context._processRender = function () {
    this.updated()
  }.bind(t.context)
  t.context.setState(_ => ({
    name: 'Bob'
  }), () => {
    t.is(t.context.state.name, 'Bob')
  })
})
