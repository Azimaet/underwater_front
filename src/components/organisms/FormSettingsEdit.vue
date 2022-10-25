<script lang="ts">
export default { name: "FormSettingsEdit" };
</script>

<script setup lang="ts">
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";
import { ref, reactive } from "vue";
import { Form, FormActions } from "@/composables/types/form";
import { useFormFactory } from "@/composables/formFactory";
import FormControlText from "@/components/molecules/FormControlText.vue";
import FormControlRadioList from "@/components/molecules/FormControlRadioList.vue";
import { MUTATION_UPDATE_USER } from "@/graphql/mutations/updateUser";
import { useMutation } from "@vue/apollo-composable";
import store from "@/store";
import { useAuthLogout } from "@/composables/auth";

const form: Form = useFormFactory(FormActions.ACCOUNT_UPDATE);

const payload = reactive({
  avatar: "",
  email: store.state.user.data.email,
  id: "/api/users/" + store.state.user.data.id,
  password: "",
  username: store.state.user.data.email,
});

const dialog = ref(false);

const handleChange = (id: string, value: string) => {
  if (id === "avatar") {
    payload.avatar = value.toString();
  } else if (id === "password_renew") {
    payload.password = value;
  } else if (id === "username_renew") {
    payload.username = value;
  }
};

const { mutate, onDone, onError } = useMutation(MUTATION_UPDATE_USER, {
  variables: {
    input: payload,
  },
});

onError((error) => {
  console.log(error);
});

onDone(() => {
  console.log("done");
  dialog.value = false;
  useAuthLogout();
});

const cardClasses = ["px-15"];

const titleClasses = [
  "text-h4",
  "font-weight-medium",
  "text-center",
  "mt-5",
  "mb-10",
];

const btnClasses = ["my-5", "mx-5"];

const progressBarClasses = ["mb-0"];
</script>

<template>
  <v-row justify="center">
    <v-card width="100%" :class="cardClasses" :color="'grey900'" rounded>
      <v-card-title>
        <div :class="titleClasses">{{ form.title }}</div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(component, index) in form.controls"
            cols="12"
            :key="index"
          >
            <component
              :is="
                component.props?.name === 'FormControlRadioList'
                  ? FormControlRadioList
                  : component.props?.name === 'FormControlText'
                  ? FormControlText
                  : ''
              "
              :id="component.id"
              :label="component.props?.label"
              :action="component.props?.options"
              :type="component.props?.type"
              @form-input-change="handleChange"
            ></component>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <ButtonComponent
          :label="'Submit'"
          :color="'success'"
          :size="'x-large'"
          :btn-classes="btnClasses"
          :loading="dialog"
          :disabled="dialog"
          @click="mutate(), (dialog = true)"
        />
        <v-dialog v-model="dialog" hide-overlay persistent>
          <v-card color="success">
            <v-card-text>
              <p>Processing server request...</p>
              <p>Imminent redirection to home.</p>
              <br />
              <v-progress-linear
                indeterminate
                color="white"
                :class="progressBarClasses"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script></script>
