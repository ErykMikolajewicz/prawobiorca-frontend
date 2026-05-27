<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  motionType?: 'search' | 'arrow'
}

withDefaults(defineProps<Props>(), {
  motionType: 'arrow'
})
</script>

<template>
  <span class="icon-btn" aria-hidden="true">
    <span :class="`${motionType}-motion`" aria-hidden="true">
      <span :class="`${motionType}-icon ${motionType}-icon-out`">
        <slot />
      </span>
      <span :class="`${motionType}-icon ${motionType}-icon-in`">
        <slot />
      </span>
    </span>
  </span>
</template>

<style scoped>
.icon-btn {
  transition: color 0.2s ease;
}

.search-motion,
.arrow-motion {
  position: relative;
  display: inline-flex;
  width: 1.5em;
  height: 1.5em;
  align-items: center;
  justify-content: center;
}

.search-icon,
.arrow-icon {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;

  transition:
    color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}

.search-icon :deep(svg),
.arrow-icon :deep(svg) {
  width: 1.5em;
  height: 1.5em;
}

</style>
