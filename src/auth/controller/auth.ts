import { Request, Response } from "express";
import authenticator from "../../authenticator";
import userCore from "../../user/index";
import fallbackController from "./fallback";

const login = async (request: Request, response: Response): Promise<void> => {
    try {
        const { username, password } = request.body;
        const user = await userCore.login(username, password);
        const authToken = authenticator.generateToken({
            ...user,
            password: undefined,
        });

        response.json(authToken);
    } catch (err) {
        await fallbackController(response, err);
    }
};

export default {
    login,
};
