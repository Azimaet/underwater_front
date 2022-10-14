import store from '@/store';
<script lang="ts">
export default { name: "ProfileTemplate" };
</script>

<script setup lang="ts">
import store from "@/store";
import StrateGasCharts from "@/components/organisms/StrateGasCharts.vue";
</script>

<template>
  <h1>
    Bienvenue sur votre profil <span>{{ store.state.user.data.username }}</span>
  </h1>

  <Suspense>
    <StrateGasCharts />
  </Suspense>
</template>
