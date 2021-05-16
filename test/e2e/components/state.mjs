import { createCustomElement, html, withLocalState } from '../util/component.mjs'

createCustomElement(
  'mock-state',
  withLocalState({
    state () {
      return { count: 0 }
    },
    increment () {
      this.state.count = this.state.count + 1
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>State component with count of&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)

createCustomElement(
  'mock-string-state',
  withLocalState({
    state () {
      return {
        dummy: 'Initial Value'
      }
    },
    clickedHandler () {
      this.state.dummy = 'Button Clicked'
    },
    mounted () {
      this.state.dummy = 'Ready'
    },
    render () {
      return html`<button type="button" color="primary" onclick=${this.clickedHandler}><span>${this.state.dummy}</span></button>`
    }
  })
)

createCustomElement(
  'mock-object-state',
  withLocalState({
    state () {
      return {
        user: {
          userId: 0,
          username: '',
          name: '',
          emailAddress: '',
          active: true
        }
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      console.log('Form submitted!')
    },
    render () {
      return html`<form method="post" @submit=${this.handleSubmit}><input
                      type="text"
                      name="username"
                      required
                      value=${this.state.user.username}>
                    </form>`
    }
  })
)

createCustomElement(
  'mock-prop-state',
  withLocalState({
    state () {
      return {
        dummy: this.props.dummy
      }
    },
    props: {
      dummy: {
        type: String,
        default: 'Default dummy'
      }
    },
    render () {
      return html`<span>${this.state.dummy}</span>`
    }
  })
)
