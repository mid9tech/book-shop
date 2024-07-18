import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/database/cache.service';
import { MyDBException } from 'src/utils/error';

@Injectable()
export class CartsRepository {
  constructor(private readonly cacheService: CacheService) {}

  private getCartKey(userId: string): string {
    return `cart:${userId}`;
  }

  async addProductToCart(
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<boolean> {
    try {
      const cartKey = this.getCartKey(userId);
      const currentQuantity = await this.cacheService.hget(cartKey, productId);
      const newQuantity =
        (currentQuantity ? parseInt(currentQuantity) : 0) + quantity;
      await this.cacheService.hset(cartKey, productId, newQuantity.toString());
      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async getCart(userId: string): Promise<any> {
    const cartKey = this.getCartKey(userId);
    const result = await this.cacheService.hgetall(cartKey);

    return result || {};
  }

  async updateProductQuantity(
    productId: string,
    userId: string,
    quantity: number,
  ): Promise<boolean> {
    try {
      const cartKey = this.getCartKey(userId);
      if (quantity <= 0) {
        await this.cacheService.hdel(cartKey, productId);
      } else {
        await this.cacheService.hset(cartKey, productId, quantity.toString());
      }
      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async removeProductFromCart(
    productId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      const cartKey = this.getCartKey(userId);
      await this.cacheService.hdel(cartKey, productId);
      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async clearCart(userId: string): Promise<boolean> {
    try {
      const cartKey = this.getCartKey(userId);
      const cart = await this.cacheService.hgetall(cartKey);
      for (const productId in cart) {
        await this.cacheService.hdel(cartKey, productId);
      }
      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
