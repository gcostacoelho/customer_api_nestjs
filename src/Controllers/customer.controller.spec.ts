import { request, response } from 'express';
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../Modules/app.module";
import { CustomerController } from "./customer.controller"
import { CustomerService } from '../Services/customer.service';

const body = {
    id: "customer:uuidV4",
    document: "11111111",
    name: "John Doe"
}

const bodyPut = {
    id: "customer:uuidV4",
    document: "21111111",
    name: "Jane Doe"
}

describe('customerController', () => {
    let controller: CustomerController;
    let customerService: CustomerService;

    beforeEach(async () => {
        const mod: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        controller = mod.get<CustomerController>(CustomerController);
        customerService = mod.get<CustomerService>(CustomerService);
    });

    it('Should a create new customer in redis', async () => {
        jest.spyOn(customerService, 'Create').mockImplementation(() => Promise.resolve(body));

        expect(await controller.postNewCustomer(request, response)).toBe(body);
    });

    it('Should get a customer per id',async () => {
        jest.spyOn(customerService, 'Search').mockImplementation(() => Promise.resolve(body))

        expect(await controller.getCustomerId(request, response)).toBe(body);
    });

    it('Should update a customer', async () => {
        jest.spyOn(customerService, 'Update').mockImplementation(() => Promise.resolve(bodyPut));

        expect(await controller.putCustomer(request, response)).toBe(bodyPut);
    });
});