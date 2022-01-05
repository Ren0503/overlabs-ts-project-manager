// @ts-nocheck
import { MongoClient } from 'mongodb';

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }


    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const mongoURL = process.env.MONGODB_URI;

        cached.promise = MongoClient.connect(mongoURL, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB)
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}