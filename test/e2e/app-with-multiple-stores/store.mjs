import { createAppState } from '../util/component.mjs'

const count = createAppState('store-1', {
  initialState: {
    count: 0
  },
  increment (payload) {
    this.state.count = payload
  }
})

const blank = createAppState('store-2', {
  initialState: {
    blank: 'This is a blank store'
  }
})

export const store = {
  count,
  blank
}
