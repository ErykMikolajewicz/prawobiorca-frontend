<script setup lang="ts">

import type {articleData} from "@/types/api/articles.ts";

type Props = {article: articleData}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'unpin', id: string): void
}>()

const handleUnpin = () => {
  emit('unpin', props.article.id)
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
        <strong>Źródło:</strong>
        <em>{{ article.document_name }}</em>
        <el-button type="danger" @click="handleUnpin">Odepnij</el-button>
    </template>
    <p>{{ article.content }}</p>
  </el-card>
</template>
