<script lang="ts">
export default { name: "FormControlText" };
</script>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
}>();

const emit = defineEmits(["formInputChange"]);

const text = ref("");
</script>

<template>
  <v-text-field
    v-model="text"
    :label="props.label"
    @change="emit('formInputChange', props.id, text)"
    variant="outlined"
  ></v-text-field>
</template>
