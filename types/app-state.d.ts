import { Persist } from './persist'

export type AppStateStoreAction = (payload?: any) => void

export interface AppStateStoreOfStores<TS> {
  [key: string]: AppStateStoreClass<TS>
}

export interface AppStateStoreBaseOptions<TS> {
  initialState?: TS
  persist?: string | Persist<TS>
  ttl?: number
}

export type AppStateStoreOptions<TS> = AppStateStoreBaseOptions<TS> & {
  [key: string]: AppStateStoreAction
}

export type AppStateStore<TS> = AppStateStoreOfStores<TS> | AppStateStoreClass<TS>

declare class AppStateStoreClass<TS> {
  constructor(options: AppStateStoreOptions<TS>)
  setState (setter: (state: TS) => any, callback?: () => void): void
  getState (key: string): any
  subscribe (callback: () => any): void
  clear (notifySubscribers?: boolean): void
}

export declare function createAppState<TS> (key: string, options: AppStateStoreOptions<TS>): AppStateStoreClass<TS>

export declare function getAppState<TS> (key: string): AppStateStoreClass<TS>
