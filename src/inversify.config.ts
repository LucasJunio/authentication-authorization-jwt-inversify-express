import { AsyncContainerModule } from 'inversify'
// import { getDbConnection } from './config/ormconfig'
import { logger } from './util/logger'
import { AuthenticationService } from './modules/authentication/services/authentication.service'
import { IAuthenticationService } from './modules/authentication/interfaces/authentication.interface'

export const bindings = new AsyncContainerModule(async bind => {
  try {

    // Bindin Controllers
    await require('./modules/authentication/controllers/authentication.controller')
    
    // Binding the services
    bind<AuthenticationService>(AuthenticationService).to(AuthenticationService)

  
    logger.info('Binding: all modules started correctly')
  } catch (error) {
    logger.error(`Binding Erro: ${error}`)
  }
})
