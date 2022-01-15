import dotenv from 'dotenv'
import yargs from 'yargs'
import { requestComplexFrom } from './network/request-builder'
import { hideBin } from 'yargs/helpers'
import { Currencies, Intervals, PairCommandOption } from './types/network'
import { Log } from './utils/logger'
import { SignalDetector, SignalDetectorProps } from './singal/SignalDetector'

dotenv.config()

// const mongo = new Mongo()
// mongo.connect().then((db) => {
//   console.log(`Connected to: ${chalk.green(db)}!`)
//   mongo.insertPair({pair: 'BTC/USD'})
// })

yargs(hideBin(process.argv))
  .command('active:signal', 'Activate signal core', (yargs) => {
    console.log('Activating Signal Search!')
    const detector = new SignalDetector({
      dates: ['', ''],
      interval: Intervals.Minute,
      symbol: Currencies.EURUSD
    })
  })
  .command('pair [pair]', 'Get the Pair information', (yargs) => {
    yargs
      .positional('pair', {
        describe: 'The selected Pair',
        default: Currencies.EURUSD
      })
  }, ({ pair, verbose }: PairCommandOption) => {
    if (verbose)
      console.info(`Getting Pair Information: ${pair}`)

    const body: SignalDetectorProps = {
      symbol: pair,
      interval: Intervals.DAY
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
