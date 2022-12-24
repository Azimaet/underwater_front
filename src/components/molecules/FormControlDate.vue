<script setup lang="ts">
import { reactive, ref } from "vue";
import { format } from "date-fns";
import { translations } from "@/i18n/index";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  value: Date;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: Date): void;
}>();

const { RULE_DATE } = translations.en.FORM_WORDING;

const errorText = ref("");

const date = reactive({
  value: format(props.value, "yyyy-MM-dd'T'HH:mm"),
});

const handleChange = () => {
  if (new Date(date.value).getTime() > new Date().getTime()) {
    date.value = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    errorText.value = RULE_DATE;
  }
  emit("formInputChange", props.id, new Date(date.value));
};
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
    <input v-model="date.value" :type="props.type" @change="handleChange()" />
    <div :class="['v-input__details']" v-show="errorText">
      <div :class="['v-messages']">
        <div
          :class="['v-messages__message', 'ml-4', 'color-warning']"
          :style="{ 'transform-origin': 'center top 0px' }"
        >
          {{ errorText }}
        </div>
      </div>
    </div>
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
