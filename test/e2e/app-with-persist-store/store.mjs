import { createAppState } from '../util/component.mjs'

export const store = createAppState('persist-store', {
  initialState: {
    count: 0
  },
  increment (payload) {
    this.state.count = payload
  },
  persist: 'count' // this must be a unique value for this store or an instance of the Persist class
})
