import { AsyncContainerModule } from "inversify";
import { UserRepository } from "./modules/repositories/user/user.repository";
import { AuthenticationService } from "./modules/services/authentication.service";
import { logger } from "./util/logger";

export const bindings = new AsyncContainerModule(async (bind) => {
  try {
    // Bindin Controllers
    await require("./modules/controllers/authentication.controller");

    // Binding the services
    bind<AuthenticationService>(AuthenticationService).to(
      AuthenticationService
    );

    // Binding the repositories
    bind<UserRepository>(UserRepository).to(UserRepository);

    logger.info("Binding: all modules started correctly");
  } catch (error) {
    logger.error(`Binding Erro: ${error}`);
  }
});
