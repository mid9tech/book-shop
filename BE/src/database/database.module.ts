import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

@Global()
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      // Store-specific configuration:
      host: redisHost,
      port: redisPort,
      password: redisPassword,
    }),
  ],
  providers: [DatabaseService, CacheService],
  exports: [DatabaseService, CacheService],
})
export class DatabaseModule {}
