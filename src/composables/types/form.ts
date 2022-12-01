// import { ButtonActions } from "@/composables/types/buttons";
import { GraphqlActions } from "./graphql";

export interface Form {
  title: string;
  controls: FormControl[];
}

export interface FormControl {
  id: string;
  props: FormControlProps | null;
}

export interface FormControlProps {
  name: string;
  label: string;
  type?: string;
  subtitle?: string;
  icon?: string | null;
  rules?: any[];
  query?: GraphqlActions;
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
  REGISTER = "FORM_ACTION_REGISTER",
  ACCOUNT_UPDATE = "ACCOUNT_UPDATE",
  ACCOUNT_DELETE = "ACCOUNT_DELETE",
  DIVE_CREATE = "FORM_ACTION_DIVE_CREATE",
}

export interface FormUserCredentials {
  email: string;
  password: string;
  username?: string;
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
