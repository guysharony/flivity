import { ISession } from "../../context/session.context";

export interface AccountConfigurationProps {
  session: ISession;
}

export interface FormValues {
  firstName: string;
  lastName: string;
}

export interface FormErrors {
  firstName: string[];
  lastName: string[];
}

export interface Form {
  values: FormValues;
  errors: Partial<FormErrors>;
}