<template>
  <el-form
    :model="form"
    @keyup.enter="onSubmit"
    label-position="top"
  >

    <el-form-item label="Nazwa użytkownika:" prop="username">
      <el-input
        v-model="form.username"
        id="username"
        required
      />
    </el-form-item>

    <el-form-item label="Hasło:" prop="password">
      <el-input
        v-model="form.password"
        type="password"
        id="password"
        show-password
        required
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="isLoading"
        @click="onSubmit"
        class="w-100"
      >
        Zaloguj
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: '',
  password: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

const onSubmit = async () => {
  if (!form.username || !form.password) {
    errorMessage.value = "Wypełnij wszystkie pola.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {

    await authStore.login();

    await router.push('/');
  } catch {
    errorMessage.value = 'Nieprawidłowa nazwa użytkownika lub hasło.';
  } finally {
    isLoading.value = false;
  }
};
</script>
