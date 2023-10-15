import {
    createCipheriv,
    createDecipheriv
} from 'crypto';
interface IConfig {
    algorithm ? : string;
    encryptionKey ? : string;
    iv ? : Buffer;
}
export default class Encryption {
    private algorithm: string;
    private key: Buffer | string;
    private iv: Buffer | null;
    constructor(config: IConfig) {
        this.algorithm = config.algorithm || '';
        // encode encryption key from utf8 to hex
        const ENCRYPTION_KEY = config.encryptionKey ? Buffer.from(config.encryptionKey).toString('hex') : '';
        // initialize key
        this.key = ENCRYPTION_KEY ? Buffer.from(ENCRYPTION_KEY, 'hex') : '';
        // initialize IV
        this.iv = config.iv || null;
        // Validate missing config options
        if (!this.algorithm || !this.key) {
            throw new Error('There was an issue with configuration!');
        }
    }
    /**
     * Encrypts data.
     *
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    encrypt(data: string): string {
        // Validate missing data
        if (!data) {
            throw new Error('Data to encrypt is required!');
        }
        // Initialize Cipher instance
        const cipher = createCipheriv(this.algorithm, this.key, this.iv);
        // Get encrypted data from the cipher instance
        const encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        // Return encrypted data
        return encryptedData;
    }
    /**
     * Decrypts data.
     *
     * @param data The data to decrypt.
     * @returns The decrypted data.
     */
    decrypt(data: string): string {
        // Validate missing data
        if (!data) {
            throw new Error('Data to decrypt is required!');
        }
        // Initialize Decipher instance
        const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
        // Get decrypted data from decipher instance
        const decryptedData = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
        // Return decrypted data
        return decryptedData;
    }
}
