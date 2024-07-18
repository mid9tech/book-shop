import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { DatabaseModule } from './database/database.module';
import { FormatError } from './utils/handleException';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PublishersModule } from './publishers/publishers.module';
import { CategoriesModule } from './categories/categories.module';
import { FileUploadModule } from './upload/upload.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ContactsModule } from './contacts/contacts.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AboutsModule } from './abouts/abouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      formatError(error) {
        return FormatError(error);
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'Gmail',
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: `"HShopp" <${configService.get<string>('MAILER_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    UsersModule,
    CartsModule,
    DatabaseModule,
    AuthModule,
    PublishersModule,
    CategoriesModule,
    FileUploadModule,
    PromotionsModule,
    ContactsModule,
    OrdersModule,
    ReviewsModule,
    AboutsModule,
  ],
  providers: [],
})
export class AppModule {}
