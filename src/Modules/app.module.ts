import { Module } from '@nestjs/common';
import { CustomerController } from '../Controllers/customer.controller';
import { CustomerService } from "../Services/customer.service";

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule { }
