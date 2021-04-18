import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import config from "./config";

const jwtSecret = config.api.auth.secret;
const jwtExpirationTime = config.api.auth.expirationTime;
const publicEndpoints = ["/status", "/auth"];

export interface AuthenticationToken {
    readonly token: string;
    readonly expiresIn: string;
}

const validateToken = (authHeader?: string): any => {
    const bearerToken = authHeader && authHeader.split(" ")[1];
    let userLogged = undefined;

    jwt.verify(
        bearerToken!,
        jwtSecret,
        (err: VerifyErrors | null, user?: any) => {
            if (err) return;
            userLogged = user;
        }
    );

    return userLogged;
};

const middleware = (
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if (!publicEndpoints.includes(request.url)) {
        const authHeader = request.headers.authorization;
        const user = validateToken(authHeader);

        if (!user) {
            response.status(403).json({ message: "Unauthorized access" });
            return;
        }
        // @ts-ignore
        request.user = user;
    }
    next();
};

const generateToken = (user: any): AuthenticationToken => {
    const token = jwt.sign(user, jwtSecret, { expiresIn: jwtExpirationTime });
    return { token, expiresIn: jwtExpirationTime };
};

export default {
    middleware,
    validateToken,
    generateToken,
};
