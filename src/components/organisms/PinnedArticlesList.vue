<script setup lang="ts">
import PinnedArticle from '@/components/molecules/PinnedArticle.vue'
import type {articleData} from "@/types/api/articles.ts"

defineProps<{ articles: Array<articleData> }>()

const emit = defineEmits<{
  (e: 'unpin', id: string): void
}>()

const handleUnpin = (id: string) => {
  emit('unpin', id)
}
</script>

<template>
    <div v-if="articles.length > 0">
      <PinnedArticle
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @unpin="handleUnpin"
      />
    </div>
    <div v-else>
      <el-empty description="Brak przypiętych artykułów do tej sprawy." />
    </div>
</template>
