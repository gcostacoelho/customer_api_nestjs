import { Controller, Get, Post, Put } from "@nestjs/common";
import { CustomerService } from "src/Services/customer.service";

@Controller('customers')
export class CustomerController {
    constructor(private readonly _customerService: CustomerService) { }

    @Post()
    postNewCustomer() {
        return this._customerService.Create();
    }

    @Get(':id')
    getCustomerId() {
        return this._customerService.Search();
    }

    @Put(':id')
    putCustomer() {
        return this._customerService.Update();
    }
}