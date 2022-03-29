import { Request, Response, NextFunction } from 'express'
import { sendMessageToDiscord } from '../network/request-builder'

function postWebhook(req: Request, res: Response, next: NextFunction) {
    const body = req.body

    sendMessageToDiscord(body)
      .then(() => {
        res.send({
          status: 'Message sent successfully',
          args: body
        })
      })
}

export default { postWebhook }