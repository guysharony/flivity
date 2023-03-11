import { UserResponse } from "@packages/core/user/dtos/user-response.dto";

export interface IProfileHeader {
  user: Required<UserResponse>;
}
