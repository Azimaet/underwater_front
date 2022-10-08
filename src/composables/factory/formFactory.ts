import {
  Form,
  FormActions,
  FormControl,
  FormControlProps,
  FormPropWritable,
} from "@/composables/types/form";

import { Dive } from "@/composables/classes/dive";
import { GraphqlActions } from "@/composables/types/graphql";
import { translations } from "@/i18n/index";

const { FORM_DIVING, FORM_WORDING } = translations.en;

interface State {
  form: Form;
}

/**
 * Dive Form Factory
 * @param {FormActions} action FormActions
 * @param {Dive} dive Dive
 * @return {Form} form Form
 */
export function useFormFactory(action: FormActions, dive?: Dive): Form {
  /**
   * Define if form prop need a field which user can interact with.
   * @param {string} prop string
   * @return {boolean} boolean
   */
  function isWritable(prop: string): boolean {
    return !!FormPropWritable[prop as keyof typeof FormPropWritable];
  }

  /**
   * Get Date Field Props.
   * @return {FormControlProps} FormControlProps
   */
  function getControlDate(): FormControlProps {
    return {
      name: "FormControlDate",
      label: "",
    };
  }

  /**
   * Get Number Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlText(context: string): FormControlProps {
    return {
      name: "FormControlText",
      model: "",
      label:
        context === "_email"
          ? FORM_WORDING.EMAIL
          : context === "_password"
          ? FORM_WORDING.PASSWORD
          : "",
    };
  }

  /**
   * Get Number Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlNumber(context: string): FormControlProps {
    return {
      name: "FormControlNumber",
      label:
        context === "_maxDepth"
          ? FORM_DIVING.MAXDEPTH
          : context === "_totalTime"
          ? FORM_DIVING.TOTALTIME
          : "",
    };
  }

  /**
   * Get Select Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlSelect(context: string): FormControlProps {
    if (context === "_divingEnvironment") {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ENV,
        options: GraphqlActions.DIVING_ENVIRONMENTS,
      };
    } else if (context === "_divingRole") {
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
   * Get Multiple Selects Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlComboBox(context: string): FormControlProps {
    if (context === "_divingType") {
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
   * Get Multiple Selects Field Props for Gas Group.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlGasGroup(context: string): FormControlProps {
    if (context === "_gasTanks") {
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
   * Generic Build Field Props function.
   * @param {string} propId string
   * @return {FormControlProps} FormControlProps
   */
  function buildProps(propId: string): FormControlProps {
    switch (propId) {
      case "_email":
        return getControlText(propId);
      case "_password":
        return getControlText(propId);
      case "_date":
        return getControlDate();
      case "_totalTime":
      case "_maxDepth":
        return getControlNumber(propId);
      case "_gasTanks":
        return getControlGasGroup(propId);
      case "_divingType":
        return getControlComboBox(propId);
      case "_divingEnvironment":
      case "_divingRole":
        return getControlSelect(propId);
      default:
        return {
          name: "",
          label: "",
        };
    }
  }

  /**
   * Form Constructor
   * @returns {Form}
   */
  function __construct(): Form {
    const form: Form = {
      title: "",
      controls: [],
      inputs: [],
    };

    if (action === FormActions.DIVE_CREATE && dive) {
      form.title = FORM_DIVING.TITLE;
      const diveProps: string[] = Dive.describe(dive);

      diveProps.forEach((propId) => {
        if (isWritable(propId)) {
          const control: FormControl = {
            id: propId,
            props: null,
          };

          control.props = buildProps(propId);
          form.controls.push(control);
        }
      });
    } else if (action === FormActions.LOGIN) {
      form.title = FORM_WORDING.LOGIN;

      const diveProps: string[] = ["_email", "_password"];

      diveProps.forEach((propId) => {
        const control: FormControl = {
          id: propId,
          props: null,
        };

        control.props = buildProps(propId);
        form.controls.push(control);
      });
    }

    form.inputs.push({
      label: FORM_WORDING.SUBMIT,
      action: action,
    });

    return form;
  }

  return __construct();
}
