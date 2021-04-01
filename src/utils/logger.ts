import { createLogger, format, Logger, transports } from 'winston'
const { combine, timestamp, prettyPrint } = format

export class Log {

  private static instance: Log
  logger: Logger

  private constructor() {
    this.logger = createLogger({
      level: 'info',
      format: combine(
        timestamp(),
        prettyPrint()
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  private static getInstance = (): Log => (
    !Log.instance ? new Log() : Log.instance
  )

  static log = (message: any) => {
    Log.getInstance().logger.log('info', message)
  }
}