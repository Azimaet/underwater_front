<script setup lang="ts">
import { FormActions } from "@/composables/types/form";
import { isLogged } from "@/composables/auth";

const props = defineProps<{
  title: string;
  subtitle: string;
}>();

const blockClasses = [
  "blurred_gradient",
  "d-flex",
  "flex-column",
  "fill-height",
  "justify-center",
  "align-center",
];

const titleClasses = ["text-h2", "font-weight-bold", "mb-4"];
const subtitleClasses = ["text-h5", "font-weight-light"];
const navClasses = ["mt-15 d-flex"];
</script>

<template>
  <v-parallax
    :src="require('@/assets/bg.jpg')"
    :scale="0.8"
    height="650"
    :style="{ top: '-64px' }"
  >
    <div :class="blockClasses">
      <div :class="'text-center'" :style="{ maxWidth: '1280px' }">
        <h1 :class="titleClasses">{{ props.title }}</h1>
        <h4 :class="subtitleClasses">{{ props.subtitle }}</h4>

        <nav :class="navClasses">
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
