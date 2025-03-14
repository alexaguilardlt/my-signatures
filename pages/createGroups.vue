<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const group = ref({ name: '', description: '', subjectId: null })

const saveGroup = async () => {
  const courseId = localStorage.getItem('courseId') // Recuperamos el ID del curso
  if (!courseId) {
    alert('Error: No se encontró el curso. Por favor, vuelve a crearlo.')
    return
  }

  if (!group.value.subjectId) {
    alert('Error: Debes seleccionar una asignatura.')
    return
  }

  const { data, error } = await supabase.from('Groups').insert([
    {
      name: group.value.name,
      description: group.value.description,
      CourseID: courseId, // Asociamos el grupo al curso
      SubjectID: group.value.subjectId // Asociamos el grupo a la asignatura seleccionada
    }
  ])

  if (error) {
    console.error('❌ Error guardando grupo:', error.message)
    alert('Error al guardar el grupo.')
  } else {
    console.log('✅ Grupo guardado:', data)
    alert('Grupo guardado correctamente.')

    // Redirigir a la pantalla de los grupos creados
    router.push('/groups')
  }
}

const fetchSubjects = async () => {
  const { data, error } = await supabase.from('subjects').select('*')

  if (error) {
    console.error('❌ Error al obtener asignaturas:', error.message)
    alert('Error al obtener asignaturas.')
  } else {
    subjects.value = data
  }
}

const subjects = ref([])

fetchSubjects() // Llamada inicial para obtener las asignaturas
</script>

<template>
  <div class="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-bold mb-4">Crear Grupo</h2>

    <input
      v-model="group.name"
      type="text"
      placeholder="Nombre del Grupo"
      class="border p-2 w-full mb-3"
    />

    <textarea
      v-model="group.description"
      placeholder="Descripción"
      class="border p-2 w-full mb-3"
    ></textarea>

    <div class="mb-3">
      <label for="subject" class="font-bold">Selecciona una Asignatura</label>
      <select v-model="group.subjectId" id="subject" class="border p-2 w-full">
        <option value="" disabled selected>Seleccione una asignatura</option>
        <option
          v-for="subject in subjects"
          :key="subject.SubjectID"
          :value="subject.SubjectID"
        >
          {{ subject.Name }}
        </option>
      </select>
    </div>

    <button
      @click="saveGroup"
      class="bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full"
    >
      Guardar Grupo
    </button>
  </div>
</template>
