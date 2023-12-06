import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, interfaces, request, requestBody, response } from 'inversify-express-utils';
import Handlers from '../../core/handlers';
import { isAuthenticatedAndAuthorized } from '../../middleware/authMiddleware';
import { LoginInput } from '../inputs/login.input';
import { IAuthenticationService } from '../interfaces/authentication.service.interface';
import { AuthenticationService } from '../services/authentication.service';

@controller('/api/v1/auth')
export class AuthenticationController implements interfaces.Controller {
  constructor(
    @inject(AuthenticationService)
    private authenticationService: IAuthenticationService,
  ) {}

  /**
   * Realiza o login e retorna o token do usuário
   * @route POST /login
   * @param {Login.model} login.body - Login DTO
   * @returns {Token.model} 200 - Token
   */
  @httpPost('/')
  public async login(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: LoginInput,
  ): Promise<interfaces.IHttpActionResult> {
    try {
      const { token, role } = await this.authenticationService.login(body);
      await this.authenticationService.session(role, req);
      return Handlers.onSuccess(res, token);
    } catch (error) {
      return Handlers.onError(res, error.message, error);
    }
  }

  @httpGet('/', isAuthenticatedAndAuthorized('admin'))
  public async privateRoute(@response() res: Response): Promise<Response> {
    try {
      const data = 'you are authenticated and authorized to access this private route';
      return Handlers.onSuccess(res, data);
    } catch (error) {
      return Handlers.onError(res, error.message, error);
    }
  }
}
