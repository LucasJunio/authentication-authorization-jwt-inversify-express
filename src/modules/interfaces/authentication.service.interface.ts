import { LoginDTO } from '../dtos/login.dto';
import { LoginInput } from '../inputs/login.input';

export interface IAuthenticationService {
  login(input: LoginInput): Promise<Partial<LoginDTO>>;
  session(role: string, req: Request): Promise<void>;
}
