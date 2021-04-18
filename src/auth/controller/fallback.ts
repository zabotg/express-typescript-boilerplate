import { Response } from "express";

export const internalError = (error: Error, response: Response): void => {
    console.log(`Unknow error has ocurred ${error.message}`);
    response.status(500).json({ message: "Something went wrong!" });
};

const errorMap: Record<string, any> = {};

export default async (response: Response, error: Error): Promise<void> => {
    const errorFunction = errorMap[error.constructor.name] || internalError;
    errorFunction(error, response);
};
