<script setup lang="ts">
const supabase = useSupabaseClient()
async function logoutUser() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error al cerrar sesión:", error.message)
  } else {
    console.log("Sesión cerrada con éxito")
    // Redirigir al usuario a la página de inicio o de login
    navigateTo('/') // O la URL que prefieras
  }
}

definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <h1>Welcome page</h1>
  <button @click="logoutUser">Logout</button>
</template>
