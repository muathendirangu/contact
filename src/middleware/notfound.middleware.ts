/**
 * import the required external modules and interfaces
 */
import {
  Request,
  Response,
  NextFunction
} from "express";
/**
*  define the notfoundHandler function
* @param request
* @param response
* @param next
*/
export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  const message = "Resource not found";
  response.status(404).send(message);
};
