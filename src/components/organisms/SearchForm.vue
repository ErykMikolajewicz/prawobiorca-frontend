<script setup lang="ts">
import { reactive } from 'vue'

import type {SearchParams} from "@/types/api/search.ts"

const props = defineProps<{
  searchParams: SearchParams
}>()

const emit = defineEmits<{
  (e: 'search', searchConfig: SearchParams): void
}>()

const searchParams = reactive<SearchParams>({
  ...props.searchParams,
})

function onSubmit(){
  if (searchParams.query.trim()) {
    emit('search', {...searchParams})
  }
}
</script>

<template>
  <el-form @submit.prevent="onSubmit">
    <el-form-item label="Twoje zapytanie:">
      <el-input
        v-model="searchParams.query"
        placeholder="Wpisz treść..."
        clearable
        required
      />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Poziom istotności:">
          <el-input-number
            v-model="searchParams.threshold"
            :min="-1"
            :max="1"
            :step="0.1"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Maksymalna liczba wyników:">
          <el-input-number
            v-model="searchParams.limit"
            :min="1"
            :step="1"
            placeholder="Brak limitu"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button native-type="submit">Przeszukaj</el-button>
    </el-form-item>
  </el-form>
</template>
