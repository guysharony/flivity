import { UserEntity } from "../entity/user.entity";

export class UserResponse {
  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.displayName = user.displayName;
    this.hasEmailVerified = !!user.hasEmailVerified;
    this.hasAccountConfigured = !!user.hasAccountConfigured;
  }

  id: string;
  email: string;
  username?: string;
  displayName?: string;
  hasEmailVerified: boolean;
  hasAccountConfigured: boolean;
}
