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
  action: FormActions;
}

export interface FormControlProps {
  name: string;
  label: string;
  hint?: string;
  rules?: any[];
  options?: any;
}

export enum FormPropWritable {
  _id = 0,
  _uuid = 0,
  _createdAt = 0,
  _updatedAt = 0,
  _date = 1,
  _totalTime = 1,
  _maxDepth = 1,
  _gasTanks = 1,
  _divingType = 1,
  _divingEnvironment = 1,
  _divingRole = 1,
  _user = 0,
}

export enum FormActions {
  LOGIN = "form_action_login",
  SIGNUP = "form_action_signup",
  DIVE_CREATE = "FORM_ACTION_DIVE_CREATE",
}

export interface FormLoginCredentials {
  email?: FormFieldInterface["model"];
  password?: FormFieldInterface["model"];
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
