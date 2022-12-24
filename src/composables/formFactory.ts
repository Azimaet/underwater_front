import {
  Form,
  FormActions,
  FormControl,
  FormControlProps,
} from "@/types/models/form";

import { DiveInterface } from "@/types/global/dive";
import { GraphqlActions } from "@/types/models/graphql";
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
  function getControlDate(): FormControlProps {
    return {
      name: "FormControlDate",
      label: "Date of the dive",
      type: "datetime-local",
    };
  }

  function getControlText(
    context: string,
    action: FormActions
  ): FormControlProps {
    const regexPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      name:
        action === FormActions.ACCOUNT_UPDATE && context === "password"
          ? "FormControlDoubleText"
          : "FormControlText",
      type:
        context === "password"
          ? "password"
          : context === "email"
          ? "email"
          : "text",
      label:
        context === "email"
          ? FORM_WORDING.EMAIL
          : context === "password"
          ? FORM_WORDING.PASSWORD
          : context === "username"
          ? FORM_WORDING.USERNAME
          : context === "security_passphrase"
          ? "Are you sure to delete your account ?"
          : "",
      icon: context === "password" ? "mdi-lock-outline" : null,
      rules: [
        ((action === FormActions.DIVE_CREATE ||
          action === FormActions.DIVE_UPDATE) &&
          context === "totalTime") ||
        ((action === FormActions.DIVE_CREATE ||
          action === FormActions.DIVE_UPDATE) &&
          context === "maxDepth")
          ? (v: string) => !!v || "Field is required"
          : action === FormActions.ACCOUNT_UPDATE && context === "password"
          ? (v: string) => !!v || "Field is required"
          : null,
        context === "password"
          ? (v: string) =>
              regexPassword.test(v) ||
              "Password should contain at 8-32chars, at least a symbol, a number, and upper and lower case letters."
          : null,
        context === "email"
          ? (v: string) =>
              regexEmail.test(v) ||
              "Field must be of type email: 'example@something.com' ."
          : context === "username"
          ? (v: string) =>
              (v.length > 3 && v.length < 33) ||
              "Username should contain between 4 and 32chars."
          : action === FormActions.ACCOUNT_DELETE
          ? (v: string) =>
              v === "DELETE" || "Field is required and to be equal 'DELETE'"
          : null,
      ],
      subtitle:
        action === FormActions.ACCOUNT_UPDATE && context === "password"
          ? " To update your account settings, please enter your current password, or renew it. "
          : "",
    };
  }

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
      rules: [
        (v: number) => !!v || FORM_WORDING.RULE_IS_REQUIRED,
        (v: number) => Math.sign(v) === 1 || FORM_WORDING.RULE_BE_POS_NUMBER,
        (v: number) => Number.isInteger(v) || FORM_WORDING.RULE_BE_INT_NUMBER,
      ],
    };
  }

  function getControlSelect(context: string): FormControlProps {
    if (context === "divingEnvironment") {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ENV,
        query: GraphqlActions.DIVING_ENVIRONMENTS,
      };
    } else {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ROLES,
        query: GraphqlActions.DIVING_ROLES,
      };
    }
  }

  function getControlComboBox(): FormControlProps {
    return {
      name: "FormControlComboBox",
      label: FORM_DIVING.SELECT_DIVING_TYPES,
      query: GraphqlActions.DIVING_TYPES,
    };
  }

  function getControlGasGroup(): FormControlProps {
    return {
      name: "FormControlGasGroup",
      label: FORM_DIVING.SELECT_GAS_TANK,
    };
  }

  function getControlRadioList(): FormControlProps {
    return {
      name: "FormControlRadioList",
      label: FORM_WORDING.SELECT_AVATAR,
    };
  }

  function buildProps(propId: string, action: FormActions): FormControlProps {
    switch (propId) {
      case "email":
      case "username":
      case "password":
      case "security_passphrase":
        return getControlText(propId, action);
      case "totalTime":
      case "maxDepth":
        return getControlNumber(propId);
      case "divingEnvironment":
      case "divingRole":
        return getControlSelect(propId);
      case "divingType":
        return getControlComboBox();
      case "date":
        return getControlDate();
      case "gasTanks":
        return getControlGasGroup();
      case "avatar":
        return getControlRadioList();
      default:
        return {
          name: "",
          label: "",
        };
    }
  }

  function __construct(): Form {
    const form: Form = {
      title:
        action === FormActions.DIVE_CREATE && dive
          ? FORM_DIVING.TITLE_ADD
          : action === FormActions.DIVE_UPDATE && dive
          ? FORM_DIVING.TITLE_UPDATE
          : action === FormActions.LOGIN
          ? FORM_WORDING.LOGIN
          : action === FormActions.REGISTER
          ? FORM_WORDING.REGISTER
          : action === FormActions.ACCOUNT_UPDATE
          ? FORM_WORDING.UPDATE_ACCOUNT
          : action === FormActions.ACCOUNT_DELETE
          ? "Delete Account"
          : "",
      controls: [],
    };

    const formProps: string[] =
      (action === FormActions.DIVE_CREATE ||
        action === FormActions.DIVE_UPDATE) &&
      dive
        ? Object.getOwnPropertyNames(dive)
        : action === FormActions.LOGIN
        ? ["email", "password"]
        : action === FormActions.REGISTER
        ? ["email", "password", "username"]
        : action === FormActions.ACCOUNT_UPDATE
        ? ["password", "username", "avatar"]
        : action === FormActions.ACCOUNT_DELETE
        ? ["security_passphrase"]
        : [];

    formProps.forEach((propId) => {
      const control: FormControl = {
        id: propId,
        props: null,
      };

      control.props = buildProps(propId, action);
      form.controls.push(control);
    });
    return form;
  }

  return __construct();
}
