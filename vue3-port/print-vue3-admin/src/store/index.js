import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    count: 10,
    currentData: {}
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    updateCurrentData({ attrName, value }) {
      this.currentData[attrName] = value
    }
  }
})
