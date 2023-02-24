import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/Middleware/Auth.middleware';
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
  }
}
