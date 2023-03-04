import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Req, 
    Res
} from "@nestjs/common";
import { Request, Response} from 'express';
import { CustomerService } from "../Services/customer.service";

@Controller('customers')
export class CustomerController {
    constructor(private readonly _customerService: CustomerService) { }

    @Post("create")
    async postNewCustomer(@Req() req: Request, @Res() resp: Response) {
        return await this._customerService.Create(req, resp)
    }

    @Get(':id')
    getCustomerId(@Req() req: Request, @Res() resp: Response) {
        return this._customerService.Search(req, resp);
    }

    @Put('put/:id')
    putCustomer(@Req() req: Request, @Res() resp: Response) {
        return this._customerService.Update(req, resp);
    }
}