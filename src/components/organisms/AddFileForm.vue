<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)

const submitFile = () => {}
</script>

<template>
  <h2>Dodaj plik</h2>
  <form method="post" action="/user/files" enctype="multipart/form-data" @submit.prevent="submitFile">
      <input id="addFile" ref="fileInput" class="el-input__inner" type="file" name="file" />
      <el-button>Dodaj plik</el-button>
  </form>
</template>
