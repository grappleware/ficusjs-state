export function withWorkerStore (worker, options) {
  return {
    ...options,
    created () {
      this.worker = worker
      globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
      globalThis.__ficusjs__.workers = globalThis.__ficusjs__.workers || new Map()
      if (!globalThis.__ficusjs__.workers.has(worker)) {
        const elements = new Set()
        elements.add(this)
        globalThis.__ficusjs__.workers.set(worker, elements)
      } else {
        const elements = globalThis.__ficusjs__.workers.get(worker)
        if (!elements.has(this)) {
          elements.add(this)
        }
      }
      if (!worker.onmessage) {
        this.worker.onmessage = e => {
          const elements = globalThis.__ficusjs__.workers.get(worker)

          for (const element of elements) {
            element.state = e.data
            // clear the getter cache
            element.computedCache = {}
            // Run the render processor now that there's changes
            element._processRender.apply(element)
          }
        }
      }
      if (options.created) options.created.call(this)
    },
    dispatch (actionName, payload) {
      this.worker.postMessage({ actionName, payload })
    }
  }
}
