<script setup lang="ts">
import { reactive } from "vue";
import { format, formatISO, parseISO } from "date-fns";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  value: Date;
}>();

const date = reactive({
  value: format(props.value, "yyyy-MM-dd'T'HH:mm"),
});
</script>

<template>
  <div :class="['position-relative', 'pb-5']">
    <span
      :class="[
        'position-absolute',
        'bg-primary',
        'text-caption',
        'color-primary',
        'mx-5',
        'px-1',
      ]"
    >
      {{ props.label }}
    </span>
    <input
      v-model="date.value"
      :type="props.type"
      @change="$emit('formInputChange', props.id, date.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
span {
  top: -10px;
  &:active {
    color: white;
  }
}

input {
  border: 1px solid #757575;
  border-radius: 5px;
  padding: 17.5px;
  width: 100%;
  transition: 0.5s;

  &:active,
  &:hover {
    border: 1px solid white;
    transition: 0.5s;
  }
}
</style>
