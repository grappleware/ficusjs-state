export declare function createPersist(namespace: string, storage: 'local' | 'session'): void

declare class Persist<TS> {
  constructor(namespace: string)
  setState (state: TS): void
  getState (): TS
  removeState (): void
}
