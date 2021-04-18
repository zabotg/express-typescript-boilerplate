import express, { Request, Response } from "express";
import authController from "./auth/controller/auth";
import authenticator from "./authenticator";

const router = express.Router();

router.use(authenticator.middleware);

router.get("/status", (_request: Request, response: Response) => {
    response.json("WORKING!");
});

router.post("/auth", authController.login);

export default router;
