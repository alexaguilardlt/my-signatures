<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const emailLogin = ref('')
const passwordLogin = ref('')

const signUpNewUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error("Error en el registro:", error.message)
  } else {
    navigateTo('/welcome')
  }
}

const loginUser  = async () => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: emailLogin.value,
    password: passwordLogin.value,
  })

  if (error) {
    if (error.message === 'Email not confirmed') {
    } else {
      console.error("Error en el login:", error.message)
    }
  } else {
    navigateTo('/welcome')
  }
}

async function resendConfirmationEmail(email) {
  const { error } = await supabase.auth.api.resendConfirmationEmail(email)

  if (error) {
    console.error("Error al reenviar el correo de confirmación:", error.message)
  } else {
    console.log("Correo de confirmación reenviado con éxito")
  }
}

</script>

<template>
  <div>
    <button @click="signUpNewUser">Crear cuenta nueva</button>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
  </div>
  <div>
    <button @click="loginUser">Login</button>
    <input type="email" v-model="emailLogin" />
    <input type="password" v-model="passwordLogin" />
  </div>
</template>
