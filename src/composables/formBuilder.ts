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
 */
export function useFormBuilder(action: FormActions) {
  /**
   * Map Form object to build it in Vue
   * @param {FormActions} action FormActions
   * @returns {FormInterface} FormInterface
   */
  function setForm(action: FormActions, form: FormInterface): FormInterface {
    switch (action) {
      case FormActions.LOGIN:
        form.fields = [
          {
            model: "",
            rules: [
              (v: any) => !!v || RULE_IS_REQUIRED,
              (v: any) => /.+@.+/.test(v) || RULE_BE_VALID,
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

  setForm(action, form);

  return form;
}
