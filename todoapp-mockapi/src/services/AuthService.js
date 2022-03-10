import { baseService } from "./baseService";

export class AuthService extends baseService {
  constructor() {
    super();
  }
  signUp = (data) => {
    return this.post(`users`, data);
  };
  signIn = () => {
    return this.get(`users`);
  };
  getListUser = () => {
    return this.get(`users`);
  };
}

export const authService = new AuthService();
