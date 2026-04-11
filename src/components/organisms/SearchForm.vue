<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialQuery?: string
}>()

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const query = ref(props.initialQuery || '')

const onSubmit = () => {
  if (query.value.trim()) {
    emit('search', query.value)
  }
}
</script>

<template>
  <el-form @submit.prevent="onSubmit">
    <el-form-item label="Twoje zapytanie:">
      <el-input
        v-model="query"
        placeholder="Wpisz treść..."
        clearable
        required
      />
    </el-form-item>
    <el-form-item>
      <el-button native-type="submit">Przeszukaj</el-button>
    </el-form-item>
  </el-form>
</template>
