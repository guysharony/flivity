import { SessionEntity } from "../entity/session.entity";

export class SessionResponse {
  constructor(session: SessionEntity) {
    this.id = session.id;
    this.email = session.email;
    this.token = session.token;
    this.userId = session.userId;
  }

  id: string;
  email: string;
  token: string;
  userId: string;
}
