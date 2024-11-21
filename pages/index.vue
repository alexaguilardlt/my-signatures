<template>
  <h1 class="text-3xl">Gestor de asignaturas</h1>
  <button class="rounded-lg border-2 border-rose-500" @click="checkClick">
    Vamos a clickar
  </button>
</template>

<script setup>
const checkClick = () => {
  console.log('click')
}
</script>
