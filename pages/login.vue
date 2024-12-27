<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const currentView = shallowRef(LoginForm)

const switchView = (view: 'LoginForm' | 'RegisterForm') => {
  currentView.value = view === 'LoginForm' ? LoginForm : RegisterForm
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <component :is="currentView" @switch-view="switchView" />
    </div>
  </div>
</template>

<style lang="css">
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.auth-box {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
