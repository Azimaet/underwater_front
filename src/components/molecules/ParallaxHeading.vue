<script setup lang="ts">
import { FormActions } from "@/composables/types/form";
import { isLogged } from "@/composables/auth";

const props = defineProps<{
  title: string;
  subtitle: string;
  image: string;
}>();
</script>

<template>
  <v-parallax
    :src="props.image"
    :scale="0.8"
    height="650"
    :style="{ top: '-64px' }"
  >
    <div
      :class="[
        'blurred_gradient',
        'd-flex',
        'flex-column',
        'fill-height',
        'justify-center',
        'align-center',
      ]"
    >
      <div :class="'text-center'" :style="{ maxWidth: '1280px' }">
        <h1 :class="['text-h2', 'font-weight-bold', 'mb-4']">
          {{ props.title }}
        </h1>
        <h2 :class="['text-h5', 'font-weight-light']">
          {{ props.subtitle }}
        </h2>
        <nav :class="['mt-15 d-flex']">
          <FormUserModal v-if="!isLogged()" :action="FormActions.REGISTER" />
          <FormUserModal v-if="!isLogged()" :action="FormActions.LOGIN" />
        </nav>
      </div>
    </div>
  </v-parallax>
</template>

<style lang="scss">
.blurred_gradient {
  background: linear-gradient(
    0deg,
    rgba(0, 10, 25, 1) 0%,
    rgba(0, 10, 25, 0) 100%
  );
}
</style>
