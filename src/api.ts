import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import { requestComplexFrom } from './network/request-builder'
import { Log } from './utils/logger'

dotenv.config()
const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Shatter reporting for duty!')
})

app.post('/complex', (req, res) => {
  requestComplexFrom(req.body).then((response) => {
    Log.log(response)
    res.send(response)
  })
})

app.listen(process.env.port, () => {
  console.log('shatter-server is listening on', chalk.green(process.env.port))
})