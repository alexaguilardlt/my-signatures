<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 text-white text-xl font-bold">
          <NuxtLink to="/">Gestor Asignaturas</NuxtLink>
        </div>
        <div v-if="authStore.isAuthenticated" class="hidden md:flex space-x-4">
          <NuxtLink
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/login"
            >dentro del if</NuxtLink
          >
        </div>
        <div v-else class="hidden md:flex space-x-4">
          <NuxtLink
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/login"
            >Login</NuxtLink
          >
        </div>
        <div class="md:hidden">
          <button class="text-gray-300 hover:text-white focus:outline-none">
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
console.log('navbar', authStore.isAuthenticated)
</script>
