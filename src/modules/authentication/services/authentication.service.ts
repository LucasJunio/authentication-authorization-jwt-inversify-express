import { injectable } from 'inversify';
import { IAuthenticationService } from '../interfaces/authentication.interface';

@injectable()
export class AuthenticationService implements IAuthenticationService {
//   @inject(CONTAINER_LOGGER_PROVIDER) private readonly logger: LoggerProvider;

  public async login(username: string, password: string): Promise<string> {
    return 'Hello world!'
  }

}
