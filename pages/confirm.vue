<script lang="ts">
const user = useSupabaseClient()

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>Waiting for login...</div>
</template>
