export interface CreateUserProps {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  displayName?: string;
  hasEmailVerified?: boolean;
  hasAccountConfigured?: boolean;
}

export interface UpdateUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  displayName?: string;
  username?: string;
  hasEmailVerified?: boolean;
  hasAccountConfigured?: boolean;
}
