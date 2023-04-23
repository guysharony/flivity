import { UserEntity } from "../entity/user.entity";

export class UserResponse {
  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.hasEmailVerified = !!user.hasEmailVerified;
    this.hasAccountConfigured = !!user.hasAccountConfigured;
  }

  id: string;
  email: string;
  hasEmailVerified: boolean;
  hasAccountConfigured: boolean;
}
