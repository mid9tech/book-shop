import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyBadRequestException, MyDBException } from 'src/utils/error';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  count() {
    return this.databaseService.user.count();
  }

  async find(limit?: number, offset?: number) {
    return await this.databaseService.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(userRegisterInput: any, salt: string) {
    const { email, password } = userRegisterInput;
    return await this.databaseService.user.create({
      data: { email, password, salt },
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { email } });
  }

  async findAdminOneByEmail(email: string): Promise<any> {
    return await this.databaseService.hShopAdmin.findFirst({
      where: { email },
    });
  }

  async findOneById(id: string): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { id } });
  }

  async findAdminById(id: string): Promise<any> {
    return await this.databaseService.hShopAdmin.findFirst({ where: { id } });
  }

  async createNewRefreshToken(
    refreshToken: string,
    userId: string,
    expired: number,
  ): Promise<any> {
    return await this.databaseService.refreshToken.create({
      data: { userId, refreshToken, expired },
    });
  }

  async deleteRefreshToken(userId: string, refreshToken: string) {
    return await this.databaseService.refreshToken.deleteMany({
      where: { userId: userId, refreshToken: refreshToken },
    });
  }

  async updateOne(id: string, updateInfo: any) {
    const { birthDate } = updateInfo;

    try {
      if (birthDate && isNaN(Date.parse(birthDate))) {
        throw new MyBadRequestException('Invalid date format');
      }

      return await this.databaseService.user.update({
        where: { id },
        data: {
          ...updateInfo,
          birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findRefreshToken(refreshToken: string, userId: string) {
    return await this.databaseService.refreshToken.findFirst({
      where: { refreshToken: refreshToken, userId: userId },
    });
  }

  async findOneByGoogleId(googleId: any) {
    return await this.databaseService.user.findFirst({
      where: { googleId: googleId },
    });
  }

  async createByOauth(userData: any) {
    return await this.databaseService.user.create({
      data: userData,
    });
  }
}
