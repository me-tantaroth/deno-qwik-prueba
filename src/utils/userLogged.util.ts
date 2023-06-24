import { USER_LOGGED } from "~/data/user.data";

export class UserLoggedUtil {
  private data: { [x: string]: any } = USER_LOGGED;

  get(key: string) {
    return this.data[key];
  }
  set(key: string, value: any) {
    this.data[key] = value;
  }
  remove(key: string) {
    delete this.data[key];
  }
}

export const INSTANCE_USER_LOGGED = new UserLoggedUtil();
