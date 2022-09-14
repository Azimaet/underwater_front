import { FormActions } from "@/types/forms/form_authentication";
import { FormInterface } from "@/types/forms/form_authentication";
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
 * Global Form Authentication Builder
 * @param {FormActions} action FormActions
 */
export function useFormAuthentication(action: FormActions) {
  /**
   * Map Form object to build it in Vue
   * @param {FormActions} action FormActions
   * @returns {FormInterface} FormInterface
   */
  function buildForm(action: FormActions, form: FormInterface): FormInterface {
    switch (action) {
      case FormActions.LOGIN:
        form.fields = [
          {
            model: "email",
            rules: [
              (v: any) => !!v || RULE_IS_REQUIRED,
              (v: any) => /.+@.+/.test(v) || RULE_BE_VALID,
            ],
            label: EMAIL,
            required: true,
          },
          {
            model: "password",
            rules: [],
            label: PASSWORD,
            required: true,
          },
        ];

        form.buttons = [
          {
            label: LOGIN,
            request: "any",
            color: "success",
          },
        ];
        break;

      default:
        break;
    }

    return form;
  }

  buildForm(action, form);

  return form;
}
