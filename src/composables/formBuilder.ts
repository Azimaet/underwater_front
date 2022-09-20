import { FormActions, FormInterface } from "@/types/components/form";

import { reactive } from "vue";
import { translations } from "@/i18n/index";

const { EMAIL, PASSWORD, RULE_IS_REQUIRED, RULE_BE_VALID, LOGIN } =
  translations.en.FORM_WORDING;

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
  switch (action) {
    case FormActions.LOGIN:
      form.fields = [
        {
          model: "",
          rules: [
            (v: unknown) => !!v || RULE_IS_REQUIRED,
            (v: string) => /.+@.+/.test(v) || RULE_BE_VALID,
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
      break;

    default:
      break;
  }

  return form;
}
