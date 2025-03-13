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
    <h2 class="text-2xl">Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          name="email"
          id="email"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          v-model="email"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          v-model="password"
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p class="mt-5">
      ¿No tienes cuenta?
      <a href="#" @click.prevent="emitSwitchView('RegisterForm')">Regístrate</a>
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
