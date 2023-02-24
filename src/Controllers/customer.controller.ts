import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Req 
} from "@nestjs/common";
import { Request } from 'express';
import { CustomerService } from "src/Services/customer.service";

@Controller('customers')
export class CustomerController {
    constructor(private readonly _customerService: CustomerService) { }

    @Post()
    async postNewCustomer(@Req() req: Request) {
        return await this._customerService.Create();
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