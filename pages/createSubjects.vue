<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const subject = ref({ name: '', description: '', topics: [] })

const addTopic = () => {
  subject.value.topics.push('') // Añadir nuevo input vacío
}

const saveSubject = async () => {
  const courseId = localStorage.getItem('courseId') // Recuperamos el ID del curso
  if (!courseId) {
    alert('Error: No se encontró el curso. Por favor, vuelve a crearlo.')
    return
  }

  const { data, error } = await supabase
    .from('subjects')
    .insert([
      {
        name: subject.value.name,
        description: subject.value.description,
        topics: subject.value.topics, // Guardamos los temas como un array
        courseid: courseId // Asociamos la asignatura al curso
      }
    ])
    .select()

  if (error) {
    console.error('❌ Error guardando asignatura:', error.message)
    alert('Error al guardar la asignatura.')
  } else {
    console.log('✅ Asignatura guardada:', data)
    alert('Asignatura guardada correctamente.')

    // Redirigir a la pantalla de Crear Grupos
    router.push('/createGroups')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-bold mb-4">Crear Asignatura</h2>

    <input
      v-model="subject.name"
      type="text"
      placeholder="Nombre de la Asignatura"
      class="border p-2 w-full mb-3"
    />

    <textarea
      v-model="subject.description"
      placeholder="Descripción"
      class="border p-2 w-full mb-3"
    ></textarea>

    <h3 class="font-bold mb-2">Temario</h3>
    <div v-for="(topic, index) in subject.topics" :key="index" class="mb-2">
      <input
        v-model="subject.topics[index]"
        type="text"
        placeholder="Tema"
        class="border p-2 w-full"
      />
    </div>
    <button
      @click="addTopic"
      class="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      + Añadir Tema
    </button>

    <button
      @click="saveSubject"
      class="bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full"
    >
      Guardar Asignatura
    </button>
  </div>
</template>
