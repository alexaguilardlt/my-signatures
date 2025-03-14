<!-- <template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">📖 Crear Nueva Asignatura</h2>

    <form @submit.prevent="createSubject" class="space-y-4">
      <div>
        <label class="block text-gray-700">📚 Nombre de la asignatura:</label>
        <input
          type="text"
          v-model="name"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label class="block text-gray-700">📝 Descripción:</label>
        <textarea
          v-model="description"
          class="w-full p-2 border rounded-lg"
        ></textarea>
      </div>

      <div>
        <label class="block text-gray-700">📖 Temario:</label>
        <textarea
          v-model="syllabus"
          class="w-full p-2 border rounded-lg"
        ></textarea>
      </div>

      <div>
        <label class="block text-gray-700"
          >📊 Cada cuántos bloques hay examen:</label
        >
        <input
          type="number"
          v-model="examFrequency"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
      >
        Guardar Asignatura
      </button>
    </form>
  </div>
</template>

<script setup>
const name = ref('')
const description = ref('')
const syllabus = ref('')
const examFrequency = ref('')

const createSubject = async () => {
  const supabase = useSupabaseClient()
  const { data, error } = await supabase.from('Subject').insert([
    {
      name: name.value,
      description: description.value,
      syllabus: syllabus.value,
      examFrequency: examFrequency.value
    }
  ])

  if (error) console.error(error)
  else console.log('Asignatura creada:', data)
}
</script> -->

<script setup>
import { ref } from 'vue'

// Conexión a Supabase
const supabase = useSupabaseClient()

// Estado del formulario
const startDate = ref('')
const endDate = ref('')
const holidays = ref([{ date: '', description: '' }])
const vacations = ref([{ startDate: '', endDate: '' }])
const loading = ref(false)

// Agregar nuevo festivo
const addHoliday = () => {
  holidays.value.push({ date: '', description: '' })
}

// Agregar nuevo periodo vacacional
const addVacation = () => {
  vacations.value.push({ startDate: '', endDate: '' })
}

// Enviar datos a Supabase
const submitForm = async () => {
  loading.value = true
  console.log('📤 Enviando datos a Supabase...')

  try {
    // Insertar año escolar
    const { data: schoolData, error: schoolError } = await supabase
      .from('SchoolYear')
      .insert([{ StartDate: startDate.value, EndDate: endDate.value }])
      .select()

    if (schoolError) throw schoolError
    if (!schoolData || schoolData.length === 0)
      throw new Error('No se pudo crear el año escolar.')

    const schoolYearID = schoolData[0].SchoolYearID
    console.log('✅ Año escolar guardado con ID:', schoolYearID)

    // Insertar festivos
    for (const holiday of holidays.value) {
      const { error: holidayError } = await supabase.from('Holiday').insert([
        {
          Date: holiday.date,
          Description: holiday.description,
          SchoolYearID: schoolYearID
        }
      ])
      if (holidayError) throw holidayError
    }
    console.log('✅ Festivos guardados correctamente.')

    // Insertar vacaciones
    for (const vacation of vacations.value) {
      const { error: vacationError } = await supabase
        .from('VacationPeriod')
        .insert([
          {
            StartDate: vacation.startDate,
            EndDate: vacation.endDate,
            SchoolYearID: schoolYearID
          }
        ])
      if (vacationError) throw vacationError
    }
    console.log('✅ Vacaciones guardadas correctamente.')

    alert('Curso creado con éxito 🎉')
  } catch (error) {
    console.error('❌ Error al guardar:', error.message)
    alert(`Error: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Configurar Año Escolar</h2>

    <!-- Fechas del curso -->
    <div class="mb-4">
      <label class="block text-gray-700">Fecha de Inicio:</label>
      <input
        v-model="startDate"
        type="date"
        class="border p-2 w-full rounded-lg"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Fecha de Fin:</label>
      <input
        v-model="endDate"
        type="date"
        class="border p-2 w-full rounded-lg"
      />
    </div>

    <!-- Festivos -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Festivos</h3>
      <div
        v-for="(holiday, index) in holidays"
        :key="index"
        class="flex gap-2 mb-2"
      >
        <input
          v-model="holiday.date"
          type="date"
          class="border p-2 rounded-lg w-1/2"
        />
        <input
          v-model="holiday.description"
          type="text"
          placeholder="Descripción"
          class="border p-2 rounded-lg w-1/2"
        />
      </div>
      <button
        @click="addHoliday"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Agregar Festivo
      </button>
    </div>

    <!-- Periodos Vacacionales -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Vacaciones</h3>
      <div
        v-for="(vacation, index) in vacations"
        :key="index"
        class="flex gap-2 mb-2"
      >
        <input
          v-model="vacation.startDate"
          type="date"
          class="border p-2 rounded-lg w-1/2"
        />
        <input
          v-model="vacation.endDate"
          type="date"
          class="border p-2 rounded-lg w-1/2"
        />
      </div>
      <button
        @click="addVacation"
        class="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Agregar Vacaciones
      </button>
    </div>

    <!-- Botón de enviar -->
    <button
      @click="submitForm"
      :disabled="loading"
      class="bg-purple-600 text-white px-6 py-3 rounded-lg w-full disabled:opacity-50"
    >
      {{ loading ? 'Guardando...' : 'Guardar Año Escolar' }}
    </button>
  </div>
</template>
