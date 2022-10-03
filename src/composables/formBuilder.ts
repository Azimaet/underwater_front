import { FormActions, FormInterface } from "@/composables/types/form";

import { reactive } from "vue";
import { translations } from "@/i18n/index";

const { EMAIL, PASSWORD, SUBMIT, RULE_IS_REQUIRED, RULE_BE_EMAIL, LOGIN } =
  translations.en.FORM_WORDING;

const { DATE, TOTALTIME, MAXDEPTH, DIVINGENV, DIVINGROLE, DIVINGTYPES } =
  translations.en.FORM_DIVING;

const form: FormInterface = reactive({
  valid: false,
  fields: null,
  buttons: null,
});

/**
 * Global Form Builder
 * @param {FormActions} action FormActions
 * @return {FormInterface} form FormInterface
 */
export function useFormBuilder(action: FormActions): FormInterface {
  function buildLoginForm() {
    form.fields = [
      {
        model: "",
        rules: [
          (v: unknown) => !!v || RULE_IS_REQUIRED,
          (v: string) => /.+@.+/.test(v) || RULE_BE_EMAIL,
        ],
        label: EMAIL,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: PASSWORD,
        required: true,
      },
    ];

    form.buttons = [
      {
        label: LOGIN,
        color: "success",
      },
    ];
  }

  function buildDiveForm() {
    form.fields = [
      {
        model: "",
        rules: [],
        label: DATE,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: TOTALTIME,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: MAXDEPTH,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: DIVINGTYPES,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: DIVINGROLE,
        required: true,
      },
      {
        model: "",
        rules: [],
        label: DIVINGENV,
        required: true,
      },
    ];

    form.buttons = [
      {
        label: SUBMIT,
        color: "success",
      },
    ];
  }

  switch (action) {
    case FormActions.LOGIN:
      buildLoginForm();
      break;
    case FormActions.DIVE_CREATE:
      buildDiveForm();
      break;

    default:
      break;
  }

  return form;
}
