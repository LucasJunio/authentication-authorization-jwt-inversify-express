import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { LoginDTO } from '../dtos/login.dto';
import { LoginInput } from '../inputs/login.input';
import { IAuthenticationService } from '../interfaces/authentication.service.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserRepository } from '../repositories/user/user.repository';
import { authenticationValidation } from '../validators/authentication';
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
              emitter.emit('done', response);
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

  public async session(role: string, req: Request): Promise<void> {
    req.session.role = role;
  }

  private async _authenticate(input: LoginInput): Promise<Partial<LoginDTO>> {
    const { username, password } = input;
    return new Promise<Partial<LoginDTO>>(async (resolve, reject) => {
      try {
        const { error } = authenticationValidation.validate(input);

        if (error) reject(error);

        const user = await this.userRepository.findOneByUsername(username);

        if (!user) {
          reject(new Error('Error username incorrect'));
        }

        const equal = await this._comparePassword(password, user.password);

        if (equal) {
          const token = await this._generateToken(user.username);

          resolve({ token, role: user.role });
        } else {
          reject(new Error('There was an error authenticating user'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private async _comparePassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }
  private async _generateToken(username: string): Promise<string> {
    return await jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
  }
}
