import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { redis } from 'src/Database/RedisConfig';
import { Customer } from "src/Model/Customer";

@Injectable()
export class CustomerService {

    async Create(request, response) {
        try {

            let id = uuidv4();
            let document = request.body.document;
            let name = request.body.name;

            if (RegExp(/[a-z]|[-.]/gmi).test(document) || name == '') {
                return response.status(HttpStatus.BAD_REQUEST).json("request inválida");
            }

            const customer: Customer = new Customer(id, document, name);

            const resp = {
                "id": customer.id,
                "document": customer.document,
                "name": customer.name
            };

            const data = {
                "document": customer.document,
                "name": customer.name
            }

            await redis.set(customer.id, JSON.stringify(data));

            return response.status(HttpStatus.CREATED).json(resp);
        } catch (error) {
            return response.status(HttpStatus.FORBIDDEN).json();
        }
    }

    Update(request, response) {

    }

    async Search(request, response) {
        let id = request.params.id

        let customer = await redis.get(id);
        const customerParsed = JSON.parse(customer)

        return response.status(HttpStatus.OK).json(customerParsed);
    }
}