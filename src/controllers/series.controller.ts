import { Request, Response, NextFunction } from 'express'
import { requestPairFromQuery} from '../network/request-builder'
import { Log } from '../utils/logger'

function postSeries(req: Request, res: Response, next: NextFunction) {
    console.log('request received')
    requestPairFromQuery(req.body.query).then((response) => {
      Log.log(response)
      res.send(response)
    })
}

export default { postSeries }