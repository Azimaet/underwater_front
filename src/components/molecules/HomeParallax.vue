<script lang="ts">
export default { name: "HomeParallax" };
</script>

<script setup lang="ts">
import ButtonElement from "@/components/atoms/ButtonElement.vue";
import { ButtonActions } from "@/composables/types/buttons";

const props = defineProps<{
  title: string;
  subtitle: string;
}>();

const blockClasses = [
  "gradient_black",
  "d-flex",
  "flex-column",
  "fill-height",
  "justify-center",
  "align-center",
];

const titleClasses = ["text-h2", "font-weight-bold", "mb-4"];
const subtitleClasses = ["text-h5", "font-weight-light"];
const navClasses = ["mt-15"];
</script>

<template>
  <v-parallax
    :src="require('@/assets/bg_homepage.jpg')"
    :scale="0.9"
    height="500"
  >
    <div :class="blockClasses">
      <h1 :class="titleClasses">{{ props.title }}</h1>
      <h4 :class="subtitleClasses">{{ props.subtitle }}</h4>

      <nav :class="navClasses">
        <ButtonElement
          :action="ButtonActions.GOTO_REGISTER"
          :label="'Register'"
        />
        <ButtonElement :action="ButtonActions.GOTO_LOGIN" :label="'Login'" />
        <!-- $router.push('login') -->
      </nav>
    </div>
  </v-parallax>
</template>

<style lang="scss" scoped>
.gradient_black {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
