<script lang="ts">
export default { name: "ButtonComponent" };
</script>

<script setup lang="ts">
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
}>();

const spanClasses = ["font-weight-bold", "text-button"];
</script>

<template>
  <v-btn
    :size="props.size"
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
    max-width="100%"
  >
    <span :class="spanClasses">
      <v-icon v-if="icon && icon.placement === 'primary'" :size="icon.size">
        {{ icon.name }}
      </v-icon>
      {{ props.label }}
    </span>
  </v-btn>
</template>
