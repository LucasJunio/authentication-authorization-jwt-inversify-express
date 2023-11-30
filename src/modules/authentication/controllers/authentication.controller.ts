
import { inject } from 'inversify'
import {
  controller,
  interfaces,
  response,
  httpPost,
  requestBody,
} from 'inversify-express-utils'
import { LoginDTO } from '../dtos/login.dto';
import Handlers from '../../../core/handlers'
import { IAuthenticationService } from '../interfaces/authentication.interface';
import { AuthenticationService } from '../services/authentication.service';

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
  public async login(@response() res: Response, @requestBody() body: LoginDTO): Promise<interfaces.IHttpActionResult> {
    try {
      const data = await this.authenticationService.login(body.username.toUpperCase(), body.password);
      return Handlers.onSuccess(res, data)
    } catch (error) {
      return Handlers.onError(res, error.message, error)
    }
  }

}
