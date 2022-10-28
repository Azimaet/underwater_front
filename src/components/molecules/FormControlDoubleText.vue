<script lang="ts">
export default { name: "FormControlDoubleText" };
</script>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type: string;
  subtitle?: string;
  icon?: string | null;
  rules?: any[];
}>();

const emit = defineEmits(["formInputChange"]);

const text = ref("");

const text_verifier = ref("");

const matchingPasswords = () => {
  if (text.value === text_verifier.value) {
    return true;
  } else {
    return "Passwords does not match.";
  }
};
</script>

<template>
  <v-text-field
    v-model="text"
    :prepend-icon="icon"
    :label="props.label"
    :type="type"
    @change="emit('formInputChange', props.id, text)"
    :rules="props.rules"
    variant="outlined"
  >
  </v-text-field>
  <br />
  <v-text-field
    v-model="text_verifier"
    :prepend-icon="icon"
    :label="props.label"
    :type="type"
    :rules="props.rules?.concat(matchingPasswords)"
    variant="outlined"
  >
  </v-text-field>

  <p v-if="props.subtitle" :class="['text-center', 'mt-5']">
    {{ props.subtitle }}
  </p>

  <v-divider :class="['my-10']"></v-divider>
</template>
