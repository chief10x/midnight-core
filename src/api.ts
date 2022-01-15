import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import { requestComplexFrom, requestPairFromQuery } from './network/request-builder'
import { Log } from './utils/logger'
import { formatComplexResponse } from './utils/formatter'

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.send(`mj-core is listening on ${chalk.green(port)} 🔥`)
})

// Fully Functioning & Updated with Signal Detector
app.post('/complex', (req, res) => {
  requestComplexFrom(req.body)
    .then((resJson) => {
      const complex = formatComplexResponse(resJson)
      console.log(complex)
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