<!-- <!-- <template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">📚 Crear Nuevo Curso</h2>

    <form @submit.prevent="createCourse" class="space-y-4">

      <div>
        <label class="block text-gray-700">📅 Inicio del curso:</label>
        <input
          type="date"
          v-model="startDate"
          class="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label class="block text-gray-700">📅 Fin del curso:</label>
        <input
          type="date"
          v-model="endDate"
          class="w-full p-2 border rounded-lg"
        />
      </div>


      <div>
        <label class="block text-gray-700">🎉 Festivos:</label>
        <div
          v-for="(holiday, index) in holidays"
          :key="index"
          class="flex space-x-2"
        >
          <input
            type="date"
            v-model="holiday.date"
            class="p-2 border rounded-lg"
          />
          <input
            type="text"
            v-model="holiday.description"
            placeholder="Descripción"
            class="p-2 border rounded-lg flex-1"
          />
          <button @click.prevent="removeHoliday(index)" class="text-red-500">
            ❌
          </button>
        </div>
        <button @click.prevent="addHoliday" class="text-blue-500 mt-2">
          + Añadir festivo
        </button>
      </div>


      <div>
        <label class="block text-gray-700">👥 Grupos:</label>
        <input
          type="text"
          v-model="groupName"
          placeholder="Nombre del grupo"
          class="w-full p-2 border rounded-lg"
        />
        <button @click.prevent="addGroup" class="text-blue-500 mt-2">
          + Añadir grupo
        </button>
      </div>

      <ul class="list-disc ml-5 text-gray-600">
        <li v-for="(group, index) in groups" :key="index">{{ group }}</li>
      </ul>


      <div>
        <label class="block text-gray-700">⏰ Horarios:</label>
        <div
          v-for="(schedule, index) in schedules"
          :key="index"
          class="flex space-x-2"
        >
          <select v-model="schedule.weekday" class="p-2 border rounded-lg">
            <option v-for="day in weekdays" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
          <input
            type="time"
            v-model="schedule.startTime"
            class="p-2 border rounded-lg"
          />
          <input
            type="time"
            v-model="schedule.endTime"
            class="p-2 border rounded-lg"
          />
          <button @click.prevent="removeSchedule(index)" class="text-red-500">
            ❌
          </button>
        </div>
        <button @click.prevent="addSchedule" class="text-blue-500 mt-2">
          + Añadir horario
        </button>
      </div>


      <div>
        <label class="block text-gray-700">📖 Temario:</label>
        <textarea
          v-model="syllabus"
          placeholder="Describe el temario"
          class="w-full p-2 border rounded-lg"
        ></textarea>
      </div>

      <div>
        <label class="block text-gray-700"
          >📝 Cada cuántos bloques hay examen:</label
        >
        <input
          type="number"
          v-model="examFrequency"
          class="w-full p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
      >
        Guardar Curso
      </button>
    </form>
  </div>
</template>

<script setup>
const startDate = ref('')
const endDate = ref('')
const holidays = ref([])
const groups = ref([])
const groupName = ref('')
const schedules = ref([])
const syllabus = ref('')
const examFrequency = ref('')
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const addHoliday = () => holidays.value.push({ date: '', description: '' })
const removeHoliday = (index) => holidays.value.splice(index, 1)

const addGroup = () => {
  if (groupName.value) {
    groups.value.push(groupName.value)
    groupName.value = ''
  }
}

const addSchedule = () =>
  schedules.value.push({ weekday: '', startTime: '', endTime: '' })
const removeSchedule = (index) => schedules.value.splice(index, 1)

const createCourse = async () => {
  const supabase = useSupabaseClient()

  const { data, error } = await supabase
    .from('SchoolYear')
    .insert([{ StartDate: startDate.value, EndDate: endDate.value }])

  if (error) console.error(error)
  else console.log('Curso creado:', data)
}
</script> -->
<!--<template>
  <div class="auth-container">
    <div class="auth-box">
      <RegisterSubject />
      <RegisterGroup />
    </div>
  </div>
</template> -->
<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold text-center mb-4">Crear Curso</h2>
    <form @submit.prevent="createCourse">
      <div class="mb-4">
        <label class="block text-gray-700">Nombre del Curso</label>
        <input
          v-model="course.name"
          type="text"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Fecha de Inicio</label>
        <input
          v-model="course.startDate"
          type="date"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Fecha de Fin</label>
        <input
          v-model="course.endDate"
          type="date"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded-lg"
      >
        Guardar Curso
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const supabase = useSupabaseClient()
const course = ref({ name: '', startDate: '', endDate: '' })

const createCourse = async () => {
  const { data, error } = await supabase
    .from('courses')
    .insert([
      {
        name: course.value.name,
        startdate: course.value.startDate,
        enddate: course.value.endDate
      }
    ])
    .select()

  if (error) console.error('Error creando curso:', error)
  else {
    console.log('Curso creado:', data)
    const courseId = toString(data[0].id)
    localStorage.setItem('courseId', data[0].courseid)
    navigateTo('/createSubjects')
  }
}
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
