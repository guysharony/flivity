export interface CreateUserProps {
  firstName?: string;
  lastName?: string;
  email: string;
  hasEmailVerified?: boolean;
  hasAccountConfigured?: boolean;
}

export interface UpdateUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  hasEmailVerified?: boolean;
  hasAccountConfigured?: boolean;
}
