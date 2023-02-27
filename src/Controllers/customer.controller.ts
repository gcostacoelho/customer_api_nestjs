import { 
    Controller, 
    Get, 
    HttpStatus, 
    Post, 
    Put, 
    RawBodyRequest, 
    Req, 
    Res
} from "@nestjs/common";
import { Request, Response} from 'express';
import { CustomerService } from "src/Services/customer.service";

@Controller('customers')
export class CustomerController {
    constructor(private readonly _customerService: CustomerService) { }

    @Post()
    async postNewCustomer(@Req() req: Request, @Res() resp: Response) {
        return await this._customerService.Create(req, resp)
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