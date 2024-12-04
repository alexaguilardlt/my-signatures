import {defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    login() {
      this.isAuthenticated = true
      console.log('store', this.isAuthenticated)
    },
    logout() {
      this.isAuthenticated = false
    }
  }
})