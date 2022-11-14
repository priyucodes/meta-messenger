import Redis from 'ioredis';
// singleton pattern
const redis = new Redis(process.env.REDIS_URL!);

export default redis;
