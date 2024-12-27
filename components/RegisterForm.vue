<script setup lang="ts">
const email = ref('')
const password = ref('')

const { signUpNewUser, error } = useAuth()

const emit = defineEmits<{
  (event: 'switch-view', view: 'LoginForm' | 'RegisterForm'): void
}>()

const handleSignUp = () => {
  signUpNewUser(email.value, password.value)
}

const emitSwitchView = (view: 'LoginForm' | 'RegisterForm') => {
  emit('switch-view', view)
}
</script>

<template>
  <div>
    <h2>Registrarse</h2>
    <form @submit.prevent="handleSignUp">
      <div>
        <label for="email">Correo Electrónico</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
    <p>
      ¿Ya tienes cuenta?
      <a href="#" @click.prevent="emitSwitchView('LoginForm')">Inicia Sesión</a>
    </p>
  </div>
</template>

<style lang="css">
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

a {
  color: #007bff;
  cursor: pointer;
}
</style>
