import {
  Form,
  FormActions,
  FormControl,
  FormControlProps,
  FormPropWritable,
} from "@/composables/types/form";

import { ButtonActions } from "./types/buttons";
import { DiveInterface } from "@/composables/types/dive";
import { GraphqlActions } from "@/composables/types/graphql";
import { translations } from "@/i18n/index";

const { FORM_DIVING, FORM_WORDING } = translations.en;

/**
 * Dive Form Factory
 * @param {FormActions} action
 * @param {DiveInterface} dive
 * @return {Form}
 */
export function useFormFactory(
  action: FormActions,
  dive?: DiveInterface
): Form {
  /**
   * Is Writable helper.
   * @param {string} prop
   * @return {boolean}
   */
  function isWritable(prop: string): boolean {
    return !!FormPropWritable[prop as keyof typeof FormPropWritable];
  }

  /**
   * Get Date field.
   * @return {FormControlProps}
   */
  function getControlDate(): FormControlProps {
    return {
      name: "FormControlDate",
      label: "Date of the dive",
      type: "datetime-local",
    };
  }

  /**
   * Get Text field.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlText(context: string): FormControlProps {
    return {
      name: "FormControlText",
      type: context === "password" ? "password" : "text",
      label:
        context === "email"
          ? FORM_WORDING.EMAIL
          : context === "password"
          ? FORM_WORDING.PASSWORD
          : context === "username"
          ? FORM_WORDING.USERNAME
          : context === "username_renew"
          ? FORM_WORDING.USERNAME_RENEW
          : "",
    };
  }

  /**
   * Get Double Text field.
   * @return {FormControlProps}
   */
  function getControlDoubleText(): FormControlProps {
    return {
      name: "FormControlDoubleText",
      type: "password",
      label: FORM_WORDING.PASSWORD_RENEW,
    };
  }

  /**
   * Get Number field.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlNumber(context: string): FormControlProps {
    return {
      name: "FormControlNumber",
      type: "number",
      label:
        context === "maxDepth"
          ? FORM_DIVING.MAXDEPTH
          : context === "totalTime"
          ? FORM_DIVING.TOTALTIME
          : "",
    };
  }

  /**
   * Get Select field.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlSelect(context: string): FormControlProps {
    if (context === "divingEnvironment") {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ENV,
        options: GraphqlActions.DIVING_ENVIRONMENTS,
      };
    } else if (context === "divingRole") {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ROLES,
        options: GraphqlActions.DIVING_ROLES,
      };
    } else {
      return {
        name: "",
        label: "",
      };
    }
  }

  /**
   * Get Multiple Selects field.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlComboBox(context: string): FormControlProps {
    if (context === "divingType") {
      return {
        name: "FormControlComboBox",
        label: FORM_DIVING.SELECT_DIVING_TYPES,
        options: GraphqlActions.DIVING_TYPES,
      };
    } else {
      return {
        name: "",
        label: "",
      };
    }
  }

  /**
   * Get Gas Group manager.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlGasGroup(context: string): FormControlProps {
    if (context === "gasTanks") {
      return {
        name: "FormControlGasGroup",
        label: FORM_DIVING.SELECT_GAS_TANK,
      };
    } else {
      return {
        name: "",
        label: "",
      };
    }
  }

  /**
   * Get Control Radio List field.
   * @param {string} context
   * @return {FormControlProps}
   */
  function getControlRadioList(context: string): FormControlProps {
    if (context === "avatar") {
      return {
        name: "FormControlRadioList",
        label: FORM_WORDING.SELECT_AVATAR,
      };
    } else {
      return {
        name: "",
        label: "",
      };
    }
  }

  /**
   * Generic Build Field Props function.
   * @param {string} propId
   * @return {FormControlProps}
   */
  function buildProps(propId: string): FormControlProps {
    switch (propId) {
      case "email":
      case "username":
      case "username_renew":
      case "password":
        return getControlText(propId);
      case "password_renew":
        return getControlDoubleText();
      case "date":
        return getControlDate();
      case "totalTime":
      case "maxDepth":
        return getControlNumber(propId);
      case "gasTanks":
        return getControlGasGroup(propId);
      case "divingType":
        return getControlComboBox(propId);
      case "divingEnvironment":
      case "divingRole":
        return getControlSelect(propId);
      case "avatar":
        return getControlRadioList(propId);
      default:
        return {
          name: "",
          label: "",
        };
    }
  }

  /**
   * Form Constructor
   * @return {Form}
   */
  function __construct(): Form {
    const form: Form = {
      title: "",
      controls: [],
      inputs: [],
    };

    if (action === FormActions.DIVE_CREATE && dive) {
      form.title = FORM_DIVING.TITLE;
      const formProps: string[] = Object.getOwnPropertyNames(dive);

      formProps.forEach((propId) => {
        if (isWritable(propId)) {
          const control: FormControl = {
            id: propId,
            props: null,
          };

          control.props = buildProps(propId);
          form.controls.push(control);
        }
      });

      form.inputs.push({
        label: FORM_WORDING.SUBMIT,
        action: ButtonActions.SUBMIT_DIVE_CREATE,
      });
    } else if (action === FormActions.LOGIN) {
      form.title = FORM_WORDING.LOGIN;

      const formProps: string[] = ["email", "password"];

      formProps.forEach((propId) => {
        const control: FormControl = {
          id: propId,
          props: null,
        };

        control.props = buildProps(propId);
        form.controls.push(control);
      });
    } else if (action === FormActions.REGISTER) {
      form.title = FORM_WORDING.REGISTER;

      const formProps: string[] = ["email", "password", "username"];

      formProps.forEach((propId) => {
        const control: FormControl = {
          id: propId,
          props: null,
        };

        control.props = buildProps(propId);
        form.controls.push(control);
      });
    } else if (action === FormActions.ACCOUNT_UPDATE) {
      form.title = FORM_WORDING.UPDATE_ACCOUNT;

      const formProps: string[] = [
        "password_renew",
        "username_renew",
        "avatar",
      ];

      formProps.forEach((propId) => {
        const control: FormControl = {
          id: propId,
          props: null,
        };

        control.props = buildProps(propId);
        form.controls.push(control);
      });
    }

    return form;
  }

  return __construct();
}
