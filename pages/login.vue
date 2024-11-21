<template>
  <div>
    <button @click="signInWithOtp">Sign In with Email</button>
    <input type="email" v-model="email" />
  </div>
  <div>
    <button @click="probando">Boton de prueba</button>
    <button @click="signUpNewUser">Crear cuenta nueva</button>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: 'http://localhost:3000/confirm'
    }
  })
  if (error) console.log(error)
}

const signUpNewUser = async () => {
  console.log('entro aqui')
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/welcome'
    }
  })
}
const probando = (event) => {
  console.log('probando', event)
}
</script>
