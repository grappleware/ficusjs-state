class StateMachine {
  /**
   * Create an instance of a state machine
   * @param {object} machine
   */
  constructor (machine) {
    this.machine = machine
  }

  /**
   * Property to return the initial state
   * @property
   * @returns {string}
   */
  get initialState () {
    return this.machine.initial || Object.keys(this.machine.states)[0]
  }

  /**
   * Method to transition to another state based on the event
   * @param {string} state
   * @param {string} event
   * @returns {string}
   */
  transition (state, event) {
    return this.machine.states[state].on[event]
  }
}

/**
 * Function to create a state machine
 * @param {object} machine
 * @returns {StateMachine}
 */
export function createStateMachine (machine) {
  return new StateMachine(machine)
}
