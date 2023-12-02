import * as bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { LoginDTO } from '../dtos/login.dto';
import { LoginInput } from '../inputs/login.input';
import { IAuthenticationService } from '../interfaces/authentication.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserRepository } from '../repositories/user/user.repository';
import EventEmitter = require('events');
@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(@inject(UserRepository) private userRepository: IUserRepository) {}

  public async login(input: LoginInput): Promise<LoginDTO> {
    return new Promise(async (resolve, reject) => {
      const emitter = new EventEmitter();
      emitter.on('done', (token) => resolve(token));
      emitter.on('error', (error) => {
        reject(error);
      });
      emitter.on('start', () => {
        this._authenticate(input)
          .then((response) => {
            if (response) {
              emitter.emit('done', { token: response });
            } else {
              emitter.emit('error', new Error('Error in authenticate user, username or password incorrect'));
            }
          })
          .catch((error) => {
            emitter.emit('error', error);
          });
      });
      emitter.emit('start');
    });
  }

  private async _authenticate(input: LoginInput): Promise<string> {
    const { username, password } = input;
    return new Promise<string>(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOneByUsername(username);

        console.log(user);

        if (!user) {
          reject('Error username incorrect');
        }

        const equal = await bcrypt.compare(user.password, password);

        if (equal) {
          const token = await jwt.sign({ username: user.username }, 'SECRET', {
            expiresIn: 86400,
          });

          resolve(token);
        } else {
          reject('Error username incorrect');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
