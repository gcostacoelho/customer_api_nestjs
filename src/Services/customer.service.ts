import { Injectable } from '@nestjs/common';
import { response, Request } from 'express';

@Injectable()
export class CustomerService {

    Create() {
        return response.status(201);
    }

    Update() {
        return response.status(200);
    }

    Search() {
        return response.status(200);
    }
}