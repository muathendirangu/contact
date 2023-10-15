import { expect } from "chai";

import Encryption from "../src/middleware/encryption.middleware";

const config = {
    algorithm: process.env.ALGORITHM,
    encryptionKey: process.env.ENCRYPTION_KEY,
};

const testName = "John doe";
const phoneNumber = "0712323818";
const encryptedString = "n4a98Hps93o=";
const encryptionLibrary = new Encryption(config);

describe("Encryption Module", () => {
    describe("Ensuring encrypting and decrypting of name and phone number", () => {
        it("should encrypt and decrypt name string correctly", () => {
            const encrypted = encryptionLibrary.encrypt(testName);
            const decrypted = encryptionLibrary.decrypt(encrypted);
            expect(encrypted.length > 0).to.eql(true);
            expect(testName).to.eql(decrypted);
        });

        it("should encrypt and decrypt phone number correctly", () => {
            const encrypted = encryptionLibrary.encrypt(phoneNumber);
            const decrypted = encryptionLibrary.decrypt(encrypted);
            expect(encrypted.length > 0).to.eql(true);
            expect(phoneNumber).to.eql(decrypted);
        });
    });

    describe("Ensure validation of library with no configuration", () => {
        it("should fail to encrypt the name due to lack of config and return an error message", () => {
            expect(() => new Encryption({}).encrypt(testName)).to.throw(
                "There was an issue with configuration!"
            );
        });
        it("should fail to decrypt the string due to lack of config and return an error message", () => {
            expect(() => new Encryption({}).decrypt(encryptedString)).to.throw(
                "There was an issue with configuration!"
            );
        });
    });
});
