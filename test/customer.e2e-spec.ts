import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/Modules/app.module';
import * as dotenv from 'dotenv';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as request from 'supertest';
import { Customer } from '../src/Model/Customer';

describe('CustomerController e2e test', () => {
    let app: INestApplication;
    let mock: MockAdapter = new MockAdapter(axios);
    let idTest: String;

    const customerData = {
        document: "11111111",
        name: "John"
    }

    beforeAll(async () => {
        dotenv.config();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    afterEach(() => {
        mock.reset();
    })

    it("Should create a new user", async () => {

        mock.onPost(`${process.env.URL}auth/realms/careers/protocol/openid-connect/token/introspect`).reply(200,
            { active: true }
        );

        const resp = await request(app.getHttpServer()).post('/customers/create')
            .set('Authorization', "Bearer token")
            .send(customerData)

        idTest = resp.body.id; // Get a UUID generate for use to get a user per ID

        expect(resp.status).toBe(201);
        expect(resp.body).toHaveProperty("id");
    })

    it("Should get a user per id", async () => {

        mock.onPost(`${process.env.URL}auth/realms/careers/protocol/openid-connect/token/introspect`).reply(200,
            { active: true }
        );

        const resp = await request(app.getHttpServer())
            .get(`/customers/${idTest}`)
            .set('Authorization', "Bearer token")

        expect(resp.status).toBe(200);
        expect(resp.body).toEqual(customerData);
    })

    it("Should update a customer per id", async () => {

        mock.onPost(`${process.env.URL}auth/realms/careers/protocol/openid-connect/token/introspect`).reply(200,
            { active: true }
        );

        const customerPut = {
            "document": "4444444",
            "name": "Jane Doe"
        }

        const resp = await request(app.getHttpServer())
            .put(`/customers/put/${idTest}`)
            .set('Authorization', "Bearer token")
            .send(customerPut)

        expect(resp.status).toBe(200);
        expect(resp.body).toEqual(customerPut);
    });

    afterAll(() => {
        console.log(idTest);
        
    })
});