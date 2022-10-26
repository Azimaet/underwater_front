<script lang="ts">
export default { name: "FormControlDoubleText" };
</script>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type: string;
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

// const first_validation = ref(false);
// const second_validation = ref(false);

// const isIdentical = () => {
//   const valid = (text.value === text_verifier.value);

//       if (valid) {
//         first_validation.value = true;
//         second_validation.value = true;
//         return;
//       }
//       if (index > 0)
//       second_validation.value = "Must be greater than first value";
//       else
//         this.firstValidation = ["Must be less than second value"];
// }

// watch(text, () => {
//   isIdentical.value = text.value === text_verifier.value;
// });

// watch(text_verifier, () => {
//   isIdentical.value = text.value === text_verifier.value;
// });
// watchEffect(text, text_verifier, () => {
//   if (text.value !== text_verifier.value) {
//     isIdentical.value = "Two fields must be identicals";
//   } else {
//     true;
//   }
// });

// watchEffect(() => {
//   console.log(isIdentical.value);

//   if (text.value !== text_verifier.value) {
//     isIdentical.value = false;
//   } else {
//     isIdentical.value = true;
//   }
// });
</script>

<template>
  <v-text-field
    v-model="text"
    prepend-icon="mdi-lock-outline"
    :label="props.label"
    :type="type"
    @change="emit('formInputChange', props.id, text)"
    :rules="[
      (v: string) => !!v || 'Field is required', 
      ]"
    variant="outlined"
  >
  </v-text-field>
  <br />
  <v-text-field
    v-model="text_verifier"
    prepend-icon="mdi-lock-outline"
    :label="props.label"
    :type="type"
    :rules="[
      (v: string) => !!v || 'Field is required', 
      matchingPasswords,
      ]"
    variant="outlined"
  >
  </v-text-field>
</template>
