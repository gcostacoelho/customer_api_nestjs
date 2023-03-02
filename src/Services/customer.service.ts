import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '../Database/RedisConfig';
import { Customer } from "../Model/Customer";

@Injectable()
export class CustomerService  {

    async Create(request, response) {
        try {

            const id = "customer:" + uuidv4();
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

    async Update(request, response) {
        let id = request.params.id;
        let body = request.body;
        let customerId = await redis.get(id);

        if (customerId == null) {
            return response.status(HttpStatus.NOT_FOUND).json("cliente inexistente")
        }

        const customerParsed = JSON.parse(customerId);

        if (customerParsed.document != body.document) {
            if (RegExp(/[a-z]|[-.]/gmi).test(body.document)) {
                return response.status(HttpStatus.BAD_REQUEST).json("request inválida");
            } else {
                customerParsed.document = body.document;
            }
        }

        if (customerParsed.name != body.name) {
            if (body.name == '') {
                return response.status(HttpStatus.BAD_REQUEST).json("request inválida");
            } else {
                customerParsed.name = body.name;
            }
        }

        const data = {
            "document": customerParsed.document,
            "name": customerParsed.name
        }

        await redis.set(id, JSON.stringify(data));

        return response.status(HttpStatus.OK).json(customerParsed)
    }

    async Search(request, response) {
        let id = request.params.id;
        let customer = await redis.get(id);

        if (customer == null) {
            return response.status(HttpStatus.NOT_FOUND).json("cliente inexistente")
        }

        const customerParsed = JSON.parse(customer);

        return response.status(HttpStatus.OK).json(customerParsed);
    }
}