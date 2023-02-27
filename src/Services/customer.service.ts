import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { redis } from 'src/Database/RedisConfig';
import { Customer } from "src/Model/Customer";

@Injectable()
export class CustomerService {

    async Create(request, response) {
        try {
            const customer: Customer = new Customer();

            const id = uuidv4();
            const document = customer.validDocument(request.body.document);
            const name = request.body.name;

            if (document === ''){
                return response.status(HttpStatus.BAD_REQUEST).json("request inválida");
            }

            const resp = {
                id, document, name
            }

            await redis.hmset(id, {
                document,
                name
            })

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