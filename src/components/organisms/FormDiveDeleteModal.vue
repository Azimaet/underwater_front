<script setup lang="ts">
import { ref } from "vue";
import { translations } from "@/i18n/index";
import { MUTATION_DELETE_DIVE } from "@/graphql/mutations/deleteDive";
import { useMutation } from "@vue/apollo-composable";
import { useAlertFactory } from "@/composables/alertFactory";

const props = defineProps<{
  id: string;
}>();

const dialog = ref(false);
const { DELETE, CANCEL } = translations.en.FORM_WORDING;
const { REMOVE_DIVE } = translations.en.ALERTS;

const { mutate, onDone, onError } = useMutation(MUTATION_DELETE_DIVE, {
  variables: {
    input: { id: props.id },
  },
});

onError((error) => {
  useAlertFactory("error", error.toString());
});

onDone(() => {
  useAlertFactory("success", REMOVE_DIVE);
  dialog.value = false;
});
</script>

<template>
  <span class="text-center">
    <ButtonComponent
      :label="DELETE"
      :color="'error'"
      :responsive="true"
      @click="dialog = true"
    />

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text> Are you sure to delete item ? </v-card-text>
        <v-card-actions>
          <ButtonComponent
            :label="CANCEL"
            :color="'primary'"
            :responsive="true"
            @click="dialog = false"
          />
          <ButtonComponent
            :label="DELETE"
            :color="'error'"
            :responsive="true"
            @click="mutate()"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
