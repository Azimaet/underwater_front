<script lang="ts">
export default { name: "FormControlDate" };
</script>

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
  {{ label }}
  <input
    v-model="date.value"
    :type="props.type"
    @change="
      $emit('formInputChange', props.id, new Date(Date.parse(date.value)))
    "
  />
</template>
