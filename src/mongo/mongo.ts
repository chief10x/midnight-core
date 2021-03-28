import mongodb, { Db } from 'mongodb'
import chalk from 'chalk'
import { Pair } from '../types/network'

const MongoClient = mongodb.MongoClient
const url = 'mongodb://127.0.0.1:27017'
const database = 'shatter-server'

export default class Mongo {

  private db: Db | null = null

  connect = () => {
    const promise = new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if (error) {
          reject()
          return console.log('Unable to Connect', error.errmsg)
        }
        
        this.db = client.db(database)

        resolve(database)
      })
    })

    return promise
  }

  insertPair = (pair: Pair) => {
    this.db?.collection('pairs').insertOne({
      pair: pair.pair
    })
  }
}

