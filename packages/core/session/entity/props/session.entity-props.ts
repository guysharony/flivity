export interface CreateSessionProps {
  userId: string;
  email: string;
  token: string;
}

export interface UpdateSessionProps {
  userId?: string;
  email?: string;
  token?: string;
}
