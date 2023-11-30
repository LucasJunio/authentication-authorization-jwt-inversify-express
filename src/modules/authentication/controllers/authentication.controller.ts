import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody, response } from 'inversify-express-utils';
import Handlers from '../../../core/handlers';
import { AuthenticationService } from '../services/authentication.service';
import { IAuthenticationService } from '../interfaces/authentication.service.interface';
import { LoginInput } from '../inputs/login.input';

@controller('/api/v1/auth')
export class AuthenticationController implements interfaces.Controller {
  constructor(@inject(AuthenticationService) private authenticationService: IAuthenticationService) {}

  /**
   * Realiza o login e retorna o token do usuário
   * @route POST /login
   * @param {Login.model} login.body - Login DTO
   * @returns {Token.model} 200 - Token
   */
  @httpPost('/')
  public async login(
    @response() res: Response,
    @requestBody() body: LoginInput,
  ): Promise<interfaces.IHttpActionResult> {
    try {
      const data = await this.authenticationService.login(body);
      return Handlers.onSuccess(res, data);
    } catch (error) {
      return Handlers.onError(res, error.message, error);
    }
  }
}
