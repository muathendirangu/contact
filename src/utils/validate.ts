/**
 * import the required external modules
 */
import { validate } from 'uuid';


export function validateUUID(uuid: string): boolean {
    if (!isString(uuid)) {
      return false;
    }

    return validate(uuid);
  }

  function isString(value: unknown): value is string {
    return typeof value === 'string';
  }
