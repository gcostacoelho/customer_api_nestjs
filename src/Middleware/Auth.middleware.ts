import axios from "axios";
import * as dotenv from 'dotenv';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            dotenv.config();

            const tokenSplited = req.headers.authorization.split(' ')[1];
            const url = process.env.URL + "auth/realms/careers/protocol/openid-connect/token/introspect"

            const body = new URLSearchParams({
                token: tokenSplited,
                client_secret: process.env.CLIENT_SECRET,
                username: process.env.USERNAME,
                client_id: process.env.CLIENT_ID
            }).toString();

            const { data } = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            if (data.active) {                
                return next();
            }

            return res.status(401).json();
        } catch (error) {
            return res.status(502).json("SSO Indisponivel")
        }
    }
}