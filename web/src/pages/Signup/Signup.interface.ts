export interface SignUpProps {
  setUser: ({ userID }: { userID: string }) => void;
}

export interface FormValues {
  email: string;
}

export interface FormErrors {
  email: string[];
}

export interface Form {
  values: FormValues;
  errors: Partial<FormErrors>;
}
