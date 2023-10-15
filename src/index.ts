/**
 *
 * import the required external dependencies and modules
 *
 */
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
    contactsRouter
} from './contact/contacts.router';
import {
    errorHandler
} from './middleware/error.middleware';
import {
    notFoundHandler
} from './middleware/notfound.middleware';
dotenv.config();
/**
 *
 * define app variable and configure environment variables
 *
 */
if (!process.env.PORT) {
    process.exit();
}
const PORT: number = parseInt(process.env.PORT as string, 10);
export const app = express();
/**
 *
 *  app middleware configuration
 *
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);
app.use(errorHandler);
app.use(notFoundHandler);
/**
 *
 * fire up the application
 *
 */
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
