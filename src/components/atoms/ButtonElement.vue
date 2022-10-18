<script lang="ts">
export default { name: "ButtonElement" };
</script>

<script setup lang="ts">
import { ButtonActions } from "@/composables/types/buttons";
import { computed } from "vue";

const props = defineProps<{
  label: string;
  action: ButtonActions;
  href?: string;
  icon?: string;
}>();

const color = computed(() => {
  switch (props.action) {
    case ButtonActions.SUBMIT_LOGIN:
    case ButtonActions.GOTO_LOGIN:
    case ButtonActions.SUBMIT_DIVE_CREATE:
      return "success";
    case ButtonActions.GOTO_REGISTER:
      return "primary";
    case ButtonActions.GOTO_GITHUB:
      return undefined;
    default:
      return undefined;
  }
});

const route = computed(() => {
  switch (props.action) {
    case ButtonActions.GOTO_LOGIN:
      return "/login";
    case ButtonActions.GOTO_REGISTER:
      return "/register";
    default:
      return "/";
  }
});

const btnClasses = ["my-5", "mx-5"];
const spanClasses = ["font-weight-bold", "text-button"];
</script>

<template>
  <v-btn
    v-if="
      action === ButtonActions.SUBMIT_LOGIN ||
      action === ButtonActions.SUBMIT_DIVE_CREATE
    "
    :color="color"
    size="x-large"
    width="150"
    height="50"
    rounded="true"
    density="comfortable"
    :class="btnClasses"
  >
    <span :class="spanClasses">
      {{ label }}
    </span>
  </v-btn>

  <router-link
    v-else-if="
      action === ButtonActions.GOTO_LOGIN ||
      action === ButtonActions.GOTO_REGISTER
    "
    :to="route"
  >
    <v-btn
      :color="color"
      size="x-large"
      width="150"
      height="50"
      rounded="true"
      density="comfortable"
      :class="btnClasses"
    >
      <span :class="spanClasses">
        {{ label }}
      </span>
    </v-btn></router-link
  >

  <v-btn v-else :href="href">
    <v-icon v-if="icon">{{ icon }}</v-icon>

    Visit my Github
  </v-btn>
</template>
