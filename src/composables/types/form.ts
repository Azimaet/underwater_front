import { ButtonActions } from "@/composables/types/buttons";
export interface Form {
  title: string;
  controls: FormControl[];
  inputs: FormInput[];
}

export interface FormControl {
  id: string;
  props: FormControlProps | null;
}

export interface FormInput {
  label: string;
  action: ButtonActions;
}

// export interface FormFieldInterface
export interface FormControlProps {
  name: string;
  label: string;
  model?: string; // TODO: rendre ça mandatory pour dive form
  hint?: string;
  rules?: any[];
  options?: any;
}

export enum FormPropWritable {
  id = 0,
  uuid = 0,
  createdAt = 0,
  updatedAt = 0,
  date = 1,
  totalTime = 1,
  maxDepth = 1,
  gasTanks = 1,
  divingType = 1,
  divingEnvironment = 1,
  divingRole = 1,
  user = 0,
}

export enum FormActions {
  LOGIN = "FORM_ACTION_LOGIN",
  DIVE_CREATE = "FORM_ACTION_DIVE_CREATE",
}

export interface FormLoginCredentials {
  email: string;
  password: string;
}

export interface FormFieldInterface {
  model: string;
  rules: unknown[];
  label: string;
  required: boolean;
}

export interface FormButtonInterface {
  label: string;
  color: string;
}

export interface FormInterface {
  valid: boolean;
  fields: FormFieldInterface[] | null;
  buttons: FormButtonInterface[] | null;
}
