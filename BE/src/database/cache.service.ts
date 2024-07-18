import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Cache, Store } from 'cache-manager';
import { promisify } from 'util';
import * as Redis from 'redis';

interface RedisStore extends Store {
  name: 'redis';
  getClient: () => Redis.RedisClientType;
  isCacheableValue: (value: any) => boolean;
}

interface RedisCache extends Cache {
  store: RedisStore;
}

@Injectable()
export class CacheService implements OnModuleInit {
  private hsetAsync: any;
  private hgetAsync: any;
  private hdelAsync: any;
  private hgetallAsync: any;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {}

  async onModuleInit() {
    const client = this.cacheManager.store.getClient();

    this.hsetAsync = promisify(client.hset).bind(client);
    this.hgetAsync = promisify(client.hget).bind(client);
    this.hdelAsync = promisify(client.hdel).bind(client);
    this.hgetallAsync = promisify(client.hgetall).bind(client);
  }

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
    if (options && options.ttl) {
      await this.cacheManager.set(key, value, options.ttl);
    } else {
      await this.cacheManager.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  async hset(key: string, field: string, value: any): Promise<void> {
    await this.hsetAsync(key, field, value);
  }

  async hget(key: string, field: string): Promise<any> {
    return await this.hgetAsync(key, field);
  }

  async hdel(key: string, field: string): Promise<void> {
    await this.hdelAsync(key, field);
  }

  async hgetall(key: string): Promise<any> {
    return await this.hgetallAsync(key);
  }
}
