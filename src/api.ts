import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import { requestComplexFrom, requestPairFromQuery, sendMessageToDiscord } from './network/request-builder'
import { Log } from './utils/logger'
import { formatComplexResponse } from './utils/formatter'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.send({
    status: `mj-core is listening on ${port})} 🔥`
  })
})

app.post('/webhook', (req, res) => {

  const body = req.body

  sendMessageToDiscord(body)
    .then(() => {
      res.send({
        status: 'Message sent successfully',
        args: body
      })
    })
})

// Fully Functioning & Updated with Signal Detector
app.post('/complex', (req, res) => {
  console.log('request body', req.body)
  requestComplexFrom(req.body)
    .then((resJson) => {
      const complex = formatComplexResponse(resJson)
      res.send(complex)
    })
})

// Todo: needs to be updated
app.post('/series', (req, res) => {
  console.log('request received')
  requestPairFromQuery(req.body.query).then((response) => {
    Log.log(response)
    res.send(response)
  })
})

app.listen(port, () => {
  console.log('mj-core is listening on', chalk.green(port), '🔥')
})