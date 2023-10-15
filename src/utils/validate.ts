/**
 * import the required external modules
 */
import { validate } from 'uuid';


export function validateUUID(uuid: string): boolean {
    return validate(uuid);
}
