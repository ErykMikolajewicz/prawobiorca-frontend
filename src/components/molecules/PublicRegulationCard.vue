<script setup lang="ts">
import type { regulationRepresentation } from '@/types/api/regulations.ts'
import SearchRoundedIcon from '@iconify-vue/material-symbols/search-rounded'
import IconMotion from '@/components/atoms/IconMotion.vue'

type Props = {
  regulation: regulationRepresentation
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="{
      name: 'SearchPublicRegulation',
      params: { regulationId: regulation.id },
      state: { filename: regulation.presentationName }
    }"
    class="regulation-card-link"
  >
    <el-card shadow="hover" class="regulation-card">
      <div class="card-content">
        <div class="regulation-info">
          <span class="file-name" :title="regulation.presentationName">{{
              regulation.presentationName
            }}</span>
        </div>
        <IconMotion motion-type="search">
          <SearchRoundedIcon />
        </IconMotion>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped>
.regulation-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.regulation-card:hover {
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.regulation-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.regulation-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.regulation-card-link:hover {
  .regulation-card {
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
  }
}

</style>
