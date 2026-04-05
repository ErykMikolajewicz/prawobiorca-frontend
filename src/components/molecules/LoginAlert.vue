<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  }
});

const title = computed(() => {
  return props.type === 'error' ? 'Błąd' : 'Info';
});
</script>

<template>
  <el-alert
    v-if="message"
    :title="title"
    :type="type"
    :description="message"
    :show-icon="true"
    :closable="false"
    class="molecule-alert"
  />
</template>
