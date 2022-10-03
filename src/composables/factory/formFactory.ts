import {
  Form,
  FormActions,
  FormControl,
  FormControlProps,
  FormPropWritable,
} from "@/types/components/form";

import { Dive } from "@/types/contents/dive";
import { GraphqlActions } from "../../types/components/graphql";
import { translations } from "@/i18n/index";

const { FORM_DIVING, FORM_WORDING } = translations.en;

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
    //TODO: utiliser la dernière date renseignée pour une dive dans le storage (dev coté store a faire)
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
  function getControlNumber(context: string): FormControlProps {
    return {
      name: "FormControlNumber",
      // rules: [
      //   (v: number) =>
      //     v.toString().match(/^[0-9]*\.?[0-9]*$/) ||
      //     FORM_WORDING.RULE_BE_NUMBER,
      //   (v: number) => v.toString().length > 0 || FORM_WORDING.RULE_IS_REQUIRED,
      // ],
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
   * Get Multiple Selects Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getControlMultiSliders(context: string): FormControlProps {
    if (context === "_gasTanks") {
      return {
        name: "FormControlMultiSliders",
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
      case "_date":
        return getControlDate();
      case "_totalTime":
      case "_maxDepth":
        return getControlNumber(propId);
      case "_gasTanks":
        return getControlMultiSliders(propId);
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
    };

    if (action === FormActions.DIVE_CREATE && dive) {
      form.title = FORM_DIVING.TITLE;
      const diveProps: string[] = Dive.describe(dive);

      diveProps.forEach((propId) => {
        if (isWritable(propId)) {
          const control: FormControl = {
            id: propId,
            isMultipliable: propId === "_gasTanks" ? true : false,
            props: null,
          };

          control.props = buildProps(propId);
          form.controls.push(control);
        }
      });
    }

    return form;
  }

  return __construct();
}
