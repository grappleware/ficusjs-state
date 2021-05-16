import { CustomElementOptions } from '@ficusjs/core'

export type StateCommand = (...args: any[]) => void

export interface StateMachineDefinition<
  TC extends object,
  TS extends object,
  TE extends object
  > {
  initial?: string
  context?: TC
  states?: {
    [K in keyof TS]: {
      on?: {
        [E in keyof TE]?: keyof TS
      }
    }
  }
  commands?: {
    [key: string]: StateCommand
  }
}

export interface WithStateMachineComponentState<
  TC extends object,
  TS extends object
  > {
  context: TC
  matches (value: keyof TS): boolean
  value: keyof TS
}

export type WithStateMachineComponentOptions<TCS, TCO> = CustomElementOptions<TCO> & {
  state: TCS
}

export declare function withStateMachine<
  TC extends object,
  TS extends object,
  TE extends object,
  TCS,
  TCO
  > (stateMachineDefinition: StateMachineDefinition<TC, TS, TE>, options: WithStateMachineComponentOptions<TCS, TCO>)
