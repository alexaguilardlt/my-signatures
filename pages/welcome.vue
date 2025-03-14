<template>
  <div>
    <h1 class="text-3xl">Benvenido, {{ user?.email }}</h1>
    <ul class="flex flex-row gap-16 mt-10">
      <li @click="navigateTo('/courses')">📚 Crear Curso</li>
      <!-- <li @click="toggleSubMenu">📂 Consultar</li>
      <ul v-if="showSubMenu">
        <li @click="navigateTo('/groups')">👥 Grupos</li>
        <li @click="navigateTo('/subjects')">📖 Asignaturas</li>
      </ul> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const showSubMenu = ref(false)

const toggleSubMenu = () => {
  showSubMenu.value = !showSubMenu.value
}

onMounted(async () => {
  let subjects = await getSubjects()
  let courses = await getCourses()
  let groups = await getGroups()
  console.log('subjects', subjects)
  console.log('courses', courses)
  console.log('groups', groups)
})
const getSubjects = async () => {
  const { data, error } = await supabase.from('subjects').select('*')
  return data
}

const getCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*')
  return data
}

const getGroups = async () => {
  const { data, error } = await supabase.from('groups').select('*')
  return data
}
</script>
