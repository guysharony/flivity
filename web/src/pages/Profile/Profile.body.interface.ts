import { UserResponse } from "@packages/core/user/dtos/user-response.dto";

export interface IProfileBody {
  user: Required<UserResponse>;
}
