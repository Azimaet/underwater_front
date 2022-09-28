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
  function getDateField(): FormControlProps {
    //TODO: utiliser la dernière date renseignée pour une dive dans le storage (dev coté store a faire)
    return {
      name: "FormDateField",
      label: "",
    };
  }

  /**
   * Get Number Field Props.
   * @param {string} context string
   * @return {FormControlProps} FormControlProps
   */
  function getNumberField(context: string): FormControlProps {
    return {
      name: "FormNumberField",
      rules: [
        (v: string) =>
          v.toString().match(/^[0-9]*\.?[0-9]*$/) ||
          FORM_WORDING.RULE_BE_NUMBER,
        (v: string) => v.toString().length > 0 || FORM_WORDING.RULE_IS_REQUIRED,
      ],
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
  function getSelectField(context: string): FormControlProps {
    if (context === "_divingEnvironment") {
      return {
        name: "FormSelectField",
        label: FORM_DIVING.SELECT_DIVING_ENV,
        options: GraphqlActions.DIVING_ENVIRONMENTS,
      };
    } else if (context === "_divingRole") {
      return {
        name: "FormSelectField",
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
  function getComboBoxField(context: string): FormControlProps {
    if (context === "_divingType") {
      return {
        name: "FormComboBoxField",
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
  function getMultiSlidersField(context: string): FormControlProps {
    if (context === "_gas") {
      return {
        name: "FormMultiSlidersField",
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
        return getDateField();
      case "_totalTime":
      case "_maxDepth":
        return getNumberField(propId);
      case "_gas":
        return getMultiSlidersField(propId);
      case "_divingType":
        return getComboBoxField(propId);
      case "_divingEnvironment":
      case "_divingRole":
        return getSelectField(propId);
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
