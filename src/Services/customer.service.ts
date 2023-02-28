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

            await redis.hmset(customer.id, {
                "document": customer.document,
                "name": customer.name
            });

            return response.status(HttpStatus.CREATED).json(resp);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json();
        }
    }

    Update() {
        // return response.status(200);
    }

    Search() {
        // return response.status(200);
    }
}