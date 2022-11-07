<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  value: Date;
}>();

const date = reactive({
  value: new Date(
    props.value.getTime() - props.value.getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 19),
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
      @change="
        $emit('formInputChange', props.id, new Date(Date.parse(date.value)))
      "
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
  border: 1px solid map-get($colors, "color-grey-600");
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
