<script setup lang="ts">
import LoginForm from '@/components/organisms/LoginForm.vue'
</script>

<template>
    <h2>Logowanie</h2>

    <LoginForm />

    <p>
      <router-link to="/accounts/register" custom v-slot="{ navigate, href }">
        <el-link :href="href" @click="navigate" type="primary">
          Załóż konto
        </el-link>
      </router-link>
    </p>
</template>
