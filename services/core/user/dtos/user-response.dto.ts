import { UserEntity } from "../entity/user.entity";

export class UserResponse {
  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.hasEmailVerified = !!user.hasEmailVerified;
    this.hasAccountConfigured = !!user.hasAccountConfigured;
  }

  id: string;
  name?: string;
  email: string;
  username?: string;
  hasEmailVerified: boolean;
  hasAccountConfigured: boolean;
}
