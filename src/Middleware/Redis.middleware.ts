import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { redis } from '../Database/RedisConfig';

@Injectable()
export class RedisMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let teste = await redis.ping()

            if (teste == "PONG") {
                return next();
            } else {
                return res.status(HttpStatus.BAD_GATEWAY).json("Cache indisponivel");
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_GATEWAY).json("Cache indisponivel");
        }
    }
}
