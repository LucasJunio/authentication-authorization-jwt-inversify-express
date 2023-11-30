import { inject, injectable } from "inversify";
import { LoginInput } from "../inputs/login.input";
import { IAuthenticationService } from "../interfaces/authentication.service.interface";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { UserRepository } from "../repositories/user/user.repository";
import EventEmitter = require("events");
@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(UserRepository) private userRepository: IUserRepository
  ) {}

  public async login(input: LoginInput): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const emitter = new EventEmitter();
      emitter.on("done", (token) => resolve(token));
      emitter.on("error", (error) => {
        reject(error);
      });
      emitter.on("start", () => {
        this._authenticate(input)
          .then((response) => {
            if (response) {
              emitter.emit("done", response);
            } else {
              emitter.emit(
                "error",
                new Error(
                  "Error in authenticate user, username or password incorrect"
                )
              );
            }
          })
          .catch((error) => {
            emitter.emit("error", error);
          });
      });
      emitter.emit("start");
    });
  }

  private async _authenticate(input: LoginInput): Promise<any> {
    const { username, password } = input;
    return new Promise<string>((resolve, reject) => {
      try {
        const user = this.userRepository.findOneByUsername(username);
        resolve("token");
      } catch (error) {
        reject(error);
      }
    });
  }
}
