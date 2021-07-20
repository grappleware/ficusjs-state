import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithWorkerStore<T> extends HTMLElement {
  dispatch: (actionName: string, payload: T) => void
}

export declare function withWorkerStore<TCO> (worker: Worker, options: CustomElementOptions<TCO>)
