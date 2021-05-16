import { createCustomElement, html, withLocalState } from '../util/component.mjs'
import { emit } from '../util/emit.mjs'

createCustomElement(
  'mock-set-state',
  withLocalState({
    state () {
      return {
        count: 0
      }
    },
    increment () {
      this.setState(
        (state) => ({ count: state.count + 1 }),
        () => emit('setStateCallback')
      )
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>setState component with count of&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)

createCustomElement(
  'mock-set-state-no-callback',
  withLocalState({
    state () {
      return {
        count: 0
      }
    },
    increment () {
      this.setState(
        (state) => ({ count: state.count + 1 })
      )
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>setState component with no callback and count of&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)

createCustomElement(
  'mock-set-state-multiple',
  withLocalState({
    state () {
      return {
        count: 0,
        isEven: false,
        color: 'secondary'
      }
    },
    increment () {
      this.setState(
        (state) => {
          const count = state.count + 1
          const isEven = count % 2 === 0
          return {
            count,
            isEven,
            color: isEven ? 'success' : 'info'
          }
        },
        () => emit('setStateMultipleCallback')
      )
    },
    render () {
      return html`<button type="button" onclick=${this.increment} class="${this.state.color}">setState component with multiple props and count of&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)

createCustomElement(
  'mock-set-state-multiple-promise',
  withLocalState({
    state () {
      return {
        count: 0,
        isEven: false
      }
    },
    increment () {
      this.setState(
        (state) => new Promise(resolve => {
          setTimeout(() => {
            const count = state.count + 1
            resolve({
              count,
              isEven: count % 2 === 0
            })
          }, 500)
        }),
        () => console.log('State has been set!')
      )
    },
    render () {
      return html`<button type="button" onclick=${this.increment} class="${this.state.isEven ? 'success' : 'secondary'}">setState component with multiple props and promise and count of&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)
