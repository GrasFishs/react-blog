import { post } from "../../tools/request";
import { IService } from "../../types/interface";
import { IUser } from "src/data/User";
class LoginService implements IService {
  public prefix = "/user";

  public async login(data: {
    username: string;
    password: string;
  }): Promise<{ user: IUser; token: string }> {
    return post<{ user: IUser; token: string }>(`${this.prefix}/login`, data);
  }
}

export const loginService = new LoginService();
