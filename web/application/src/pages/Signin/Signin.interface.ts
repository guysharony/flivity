export interface SignInProps {
  setUser: ({ userID }: { userID: string }) => void;
}

export interface FormInputs {
  email: string;
}

export interface Form {
  values: FormInputs;
  errors: Partial<FormInputs>;
}
