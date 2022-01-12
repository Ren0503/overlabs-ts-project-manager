import Redis from 'redis';

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600

async function getOrSetCache<T>(key: string, cb: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, reply) => {
            if (error) return reject(error)
            if (reply != null) return resolve(JSON.parse(reply))
            const freshData = await cb()
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

export { getOrSetCache };