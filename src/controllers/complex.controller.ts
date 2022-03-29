import { Request, Response, NextFunction } from 'express'
import { formatComplexResponse } from '../utils/formatter'
import { requestComplexFrom } from '../network/request-builder'

function postComplex(req: Request, res: Response, next: NextFunction) {
    console.log('request body', req.body)
    requestComplexFrom(req.body)
      .then((resJson) => {
        const complex = formatComplexResponse(resJson)
        res.send(complex)
      })
}

export default { postComplex }