<script setup lang="ts">
import { ref } from "vue";
import store from "@/store";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  icon?: string | null;
  rules?: [];
}>();

const emit = defineEmits(["formInputChange"]);

const text = ref(
  props.id === "username" && store.state.user.data.username
    ? store.state.user.data.username
    : ""
);
</script>

<template>
  <v-text-field
    v-model="text"
    :prepend-icon="icon || undefined"
    :label="props.label"
    :rules="props.rules"
    :type="type"
    @change="emit('formInputChange', props.id, text)"
    variant="outlined"
  ></v-text-field>
</template>
