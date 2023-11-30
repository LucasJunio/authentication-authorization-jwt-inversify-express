import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'
import * as cors from 'cors'
import { NextFunction, Request, Response } from 'express'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as morgan from 'morgan'
import { bindings } from './inversify.config'
import { logger } from './util/logger'
const config = {serverPort: 3001}

export const Server = (async () => {
  try {
    logger.info('Starting AUTHENTICATION-AUTHORIZATION')

    const container = new Container()
    await container.loadAsync(bindings)
    const app = new InversifyExpressServer(container)
    app.setConfig(app => {
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.stack)
        next(err)
      })
      app.use(cors())
      app.use(
        morgan('common', {
          stream: fs.createWriteStream('./logs/access.log', { flags: 'a' }),
          skip: (req: Request, res: Response) => res.statusCode < 400
        })
      )
      app.use(
        morgan('dev', {
          skip: (req: Request, res: Response) => res.statusCode < 400
        })
      )
    })
    const server = app.build()

    const port = config.serverPort || 3001
    const serverPort = normalizePort(port)

    server.listen(serverPort, () => {
      logger.info(`AUTHENTICATION-AUTHORIZATION listening on port ${port}!`)
    })
  } catch (error) {
    logger.error(`AUTHENTICATION-AUTHORIZATION Initialize error: ${error}`)
  }
})()

function normalizePort(val: any): any {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}
