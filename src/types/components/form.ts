export enum FormActions {
  LOGIN = "form_action_login",
  SIGNUP = "form_action_signup",
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
