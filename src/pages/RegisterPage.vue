<script setup lang="ts">
import RegisterForm from '@/components/organisms/RegisterForm.vue'
</script>

<template>
    <h2>Rejestracja</h2>

    <RegisterForm />

    <p>
      <router-link to="/auth/login" custom v-slot="{ navigate, href }">
        <el-link :href="href" @click="navigate">
          Masz już konto? Zaloguj się
        </el-link>
      </router-link>
    </p>
</template>
