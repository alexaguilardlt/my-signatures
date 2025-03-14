<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">👥 Crear Nuevo Grupo</h2>

    <form @submit.prevent="createGroup" class="space-y-4">
      <div>
        <label class="block text-gray-700">🏫 Nombre del grupo:</label>
        <input
          type="text"
          v-model="groupName"
          class="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label class="block text-gray-700">📚 Asignatura:</label>
        <select v-model="subjectID" class="w-full p-2 border rounded-lg">
          <option
            v-for="subject in subjects"
            :key="subject.SubjectID"
            :value="subject.SubjectID"
          >
            {{ subject.Name }}
          </option>
        </select>
      </div>

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

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
      >
        Guardar Grupo
      </button>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const groupName = ref('')
const subjectID = ref('')
const subjects = ref([])
const schedules = ref([])
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const addSchedule = () =>
  schedules.value.push({ weekday: '', startTime: '', endTime: '' })
const removeSchedule = (index) => schedules.value.splice(index, 1)

// Obtener asignaturas disponibles
const fetchSubjects = async () => {
  const { data } = await supabase.from('Subject').select('*')
  subjects.value = data
}
fetchSubjects()

const createGroup = async () => {
  const { data, error } = await supabase
    .from('ClassGroup')
    .insert([{ name: groupName.value, subjectID: subjectID.value }])

  if (data) {
    for (const schedule of schedules.value) {
      await supabase
        .from('Schedule')
        .insert([
          {
            weekday: schedule.weekday,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            classGroupID: data[0].ClassGroupID
          }
        ])
    }
  }

  if (error) console.error(error)
}
</script>
