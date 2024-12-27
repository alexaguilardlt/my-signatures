<script setup lang="ts">
const email = ref('')
const password = ref('')

const { login, error } = useAuth()

const handleLogin = () => {
  login(email.value, password.value)
}

const emit = defineEmits<{
  (event: 'switch-view', view: 'LoginForm' | 'RegisterForm'): void
}>()

const emitSwitchView = (view: 'LoginForm' | 'RegisterForm') => {
  emit('switch-view', view)
}
</script>

<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Correo electrónico</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p>¿No tienes cuenta?</p>
    <a href="#" @click.prevent="emitSwitchView('RegisterForm')">Regístrate</a>
  </div>
</template>

<style lang="css">
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007bff;
  cursor: pointer;
}
</style>
