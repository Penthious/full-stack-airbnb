import { User } from "../../../entity/User";

declare namespace ME {
  interface meResponse {
    data: {
      me: User;
    };
    errors?: any[];
  }
}
