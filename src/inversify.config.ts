import { AsyncContainerModule } from 'inversify';
import { UserRepository } from './modules/authentication/repositories/user/user.repository';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { logger } from './util/logger';

export const bindings = new AsyncContainerModule(async (bind) => {
  try {
    // Bindin Controllers
    await require('./modules/authentication/controllers/authentication.controller');

    // Binding the services
    bind<AuthenticationService>(AuthenticationService).to(AuthenticationService);

    // Binding the repositories
    bind<UserRepository>(UserRepository).to(UserRepository);

    logger.info('Binding: all modules started correctly');
  } catch (error) {
    logger.error(`Binding Erro: ${error}`);
  }
});
