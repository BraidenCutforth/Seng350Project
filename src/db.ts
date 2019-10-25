import { MongoClient, Db, MongoError } from 'mongodb'

const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://runaway:Y2ABndDFux4zyWzPsMxa6D4h@seng350-f19-3-6-db-6khes.mongodb.net/test?retryWrites=true&w=majority' // Eventually set to a env var

let _db: Db | undefined

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export async function initDb() {
    if (_db !== undefined) {
        return
    }
    await client.connect()
    _db = client.db('runaway')
}

export function getDb() {
    if (_db !== undefined) {
        return _db
    } else {
        throw new Error('Database has not been initialized')
    }
}

export async function closeDb() {
    await client.close()
}
