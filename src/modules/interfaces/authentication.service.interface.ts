import { LoginInput } from '../inputs/login.input';

export interface IAuthenticationService {
  login(input: LoginInput): Promise<string>
}
