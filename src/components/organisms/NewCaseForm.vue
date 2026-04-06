<script setup lang="ts">
import { ref } from 'vue'

const caseName = ref('')

const submitCase = () => {
}
</script>

<template>
  <h2>Nowa sprawa</h2>
  <form action="/user/cases" method="post" @submit.prevent="submitCase">
    <el-input
        v-model="caseName"
        id="case_name"
        name="case_name"
        required
      />
    <el-button>Utwórz sprawę</el-button>
  </form>
</template>
