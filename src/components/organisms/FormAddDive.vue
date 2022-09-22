<script lang="ts">
export default { name: "FormAddDive" };
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FormInterface } from "@/types/components/form";
import FormField from "@/components/molecules/FormField.vue";
import FormButton from "@/components/molecules/FormButton.vue";
import { queryDivingRoles } from "@/composables/graphql/queryDivingRoles";

const props = defineProps<{
  form: FormInterface;
}>();

const isValid = ref(props.form.valid);

const getDivingRoles = () => {
  const result = queryDivingRoles();

  let divingRoles = computed(
    () =>
      result.value?.divingRoles.edges.map(
        (role: { node: unknown }) => role.node
      ) ?? []
  );

  return divingRoles.value.map((i: { label: any }) => i.label);
};
</script>

<template>
  <v-form ref="form" v-model="isValid" lazy-validation>
    <FormField
      v-for="(field, index) in form.fields"
      v-model="field.model"
      :key="index"
      :field="field"
      :ref="field.model" />
    <v-col class="d-flex" cols="12" sm="6">
      <v-select :items="getDivingRoles()" label="Select Diving Role"></v-select>
    </v-col>
    <!-- 
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-switch
                v-model="model"
                label="red"
                color="red"
                value="red"
              ></v-switch>
              <v-switch
                v-model="model"
                label="red"
                color="red"
                value="red"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card> -->
    <FormButton
      v-for="(button, index) in form.buttons"
      :disabled="isValid"
      :key="index"
      :button="button"
  /></v-form>
</template>
