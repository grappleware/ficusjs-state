import { CustomElementOptions } from '@ficusjs/core'

export type WithLocalStateComponentOptions<TS, TCO> = CustomElementOptions<TCO> & {
  state: TS
}

export interface FicusComponentWithLocalState<TS> extends HTMLElement {
  state: TS
  setState (setter: (state: TS) => any, callback?: () => void): void
}

export declare function withLocalState<TS, TCO> (options: WithLocalStateComponentOptions<TS, TCO>)
