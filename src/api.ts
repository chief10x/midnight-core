import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import chalk from 'chalk'

import routes from './routes/routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.use(routes);

app.listen(port, () => {
  console.log('mj-core is listening on', chalk.green(port), '🔥')
})