import dotenv from 'dotenv'
import yargs from 'yargs'
import { requestComplexFrom, requestPair } from './network/request-builder'
import { hideBin } from 'yargs/helpers'
import { ComplexRequestBody, Intervals, ListOrder, PairCommandOption } from './types/network'
import Mongo from './mongo/mongo'
import { Log } from './utils/logger'
import { TechnicalMethods } from './config/methods'

dotenv.config()

// const mongo = new Mongo()
// mongo.connect().then((db) => {
//   console.log(`Connected to: ${chalk.green(db)}!`)
//   mongo.insertPair({pair: 'BTC/USD'})
// })

yargs(hideBin(process.argv))
  .command('pair [pair]', 'Get the Pair information', (yargs) => {
    yargs
      .positional('pair', {
        describe: 'The selected Pair',
        default: 'EUR/USD'
      })
  }, ({ pair, verbose }: PairCommandOption) => {
    if (verbose)
      console.info(`Getting Pair Information: ${pair}`)

    const body: ComplexRequestBody = {
      symbols: [pair],
      intervals: [Intervals.DAY],
      start_date: '2021-03-21',
      end_date: '2021-03-25',
      order: ListOrder.ASC,
      timezone: 'Europe/Rome',
      methods: [
        TechnicalMethods.TimeSeries,
        TechnicalMethods.ATR,
      ]
    }

    requestComplexFrom(body).then(value => {
      Log.log(value)
    })
  })
  .command('pair-from [pair] [from]', 'Get the Pair information from a Date', (yargs) => {
    yargs
      .positional('pair', {
        describe: 'The Selected Pair',
        default: 'EUR/USD'
      })
  }, ({ pair, from, verbose }: PairCommandOption) => {
    if (verbose)
      console.info(`Getting Pair Information from: ${pair} ${from}`)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv
