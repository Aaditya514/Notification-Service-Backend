import Redis from 'ioredis';
import { REDIS_URL } from '../config/index.js';

export const redis = new Redis(REDIS_URL);

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});
