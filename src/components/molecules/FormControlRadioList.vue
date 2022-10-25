<script lang="ts">
export default { name: "FormControlRadioList" };
</script>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  label: string;
}>();

const titleClasses = ["font-weight-medium", "text-subtitle-1", "mb-5"];

const radioGroupClasses = ["d-flex", "align-center", "justify-center"];

const radioOuter = [
  "d-flex",
  "flex-column-reverse",
  "justify-center",
  "align-center",
  "mx-10",
];

const radioClasses = ["mt-2", "mb-5"];
</script>

<template>
  <v-col>
    <h4 :class="titleClasses">{{ props.label }}</h4>
    <v-radio-group
      @update:modelValue="$emit('formInputChange', props.id, $event)"
      :class="radioGroupClasses"
      inline
    >
      <div v-for="index in 13" :key="index" :class="radioOuter">
        <v-radio :value="index" :class="radioClasses"></v-radio>
        <v-avatar
          :image="require('@/assets/avatars/avatar' + index + '.svg')"
          size="75"
        >
        </v-avatar>
      </div>
    </v-radio-group>
  </v-col>
</template>
