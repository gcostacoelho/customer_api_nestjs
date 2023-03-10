import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../Middleware/Auth.middleware';
import { RedisMiddleware } from '../Middleware/Redis.middleware';
import { CustomerController } from '../Controllers/customer.controller';
import { CustomerService } from "../Services/customer.service";

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(RedisMiddleware).forRoutes('*');
  }
}
