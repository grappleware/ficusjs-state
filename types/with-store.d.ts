import { AppStateStore } from './app-state'
import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithStore<TS> extends HTMLElement {
  setStore: (store: AppStateStore<TS>) => void
}

export declare function withStore<TS, TCO> (store: AppStateStore<TS>, options: CustomElementOptions<TCO>)
