<script setup lang="ts">
import { isMobile } from "@/composables/utils/isMobile";

const props = defineProps<{
  label?: string;
  btnClasses?: string[];
  size?: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  density?: "default" | "comfortable" | "compact" | undefined;
  variant?:
    | "flat"
    | "text"
    | "elevated"
    | "tonal"
    | "outlined"
    | "plain"
    | undefined;

  block?: boolean;
  href?: string;
  icon?: {
    name?: string;
    placement?: string;
    size?: string;
  };
  responsive?: boolean;
}>();
</script>

<template>
  <v-btn
    :size="!(props.responsive && isMobile.value) ? props.size : 'small'"
    :color="props.color"
    :variant="props.variant"
    :class="btnClasses"
    :href="href"
    :target="href ? '_blank' : false"
    :block="block ? block : undefined"
    :prepend-icon="
      props.icon?.placement === 'prepend' ? props.icon.name : undefined
    "
    :append-icon="
      props.icon?.placement === 'append' ? props.icon.name : undefined
    "
    :loading="loading"
    :disabled="disabled"
    rounded="true"
    :density="props.density"
    :icon="props.responsive && isMobile.value"
    max-width="100%"
  >
    <span :class="['font-weight-bold', 'text-button']">
      <v-icon
        v-if="
          icon &&
          (icon.placement === 'primary' || icon.placement === 'responsive')
        "
        :size="!(props.responsive && isMobile.value) ? icon.size : 'default'"
        :class="icon.placement === 'responsive' ? ['d-sm-none'] : null"
      >
        {{ icon.name }}
      </v-icon>
      <span :class="responsive === true ? ['d-none', 'd-sm-flex'] : null">
        {{ props.label }}
      </span>
    </span>
  </v-btn>
</template>
