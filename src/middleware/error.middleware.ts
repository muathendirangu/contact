/**
 * import the required external modules and interfaces
 */
import HttpException from '../utils/httpExceptions';
import {
    Request,
    Response,
    NextFunction
} from "express";
/**
 * define the the error handler function
 * @param error
 * @param request
 * @param response
 * @param next
 */
export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};
