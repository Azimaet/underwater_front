export enum FormActions {
  LOGIN = "form_action_login",
  SIGNUP = "form_action_signup",
}

export interface FormFieldInterface {
  model: string;
  rules: any[];
  label: string;
  required: boolean;
}

export interface FormButtonInterface {
  label: string;
  color: string;
  request: any;
}

export interface FormInterface {
  valid: boolean;
  fields: FormFieldInterface[] | null;
  buttons: FormButtonInterface[] | null;
}
