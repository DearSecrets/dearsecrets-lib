"use strict";

export class DearSecretsWebCrypto {
    constructor() {
        this.crypto = window.crypto;
        this.subtle = this.crypto.subtle;
    }


    /**
    *
    * @param {data: ArrayBuffer}
    * @param {key: ArrayBuffer}
    * @param {iv: ArrayBuffer}
    * @returns {encryptedData: ArrayBuffer}
    *
    */
    async aesGcmEncrypt(data, key, iv) {
        const importedKey = await this.subtle.importKey("raw", key, { name: "AES-GCM" }, false, ["encrypt"]);
        const encryptedData = await this.subtle.encrypt({ name: "AES-GCM", iv: iv }, importedKey, data);

        return encryptedData;
    }


    /**
    *
    * @param {data: ArrayBuffer}
    * @param {key: ArrayBuffer}
    * @param {iv: ArrayBuffer}
    * @returns {decryptedData: ArrayBuffer}
    *
    */
    async aesGcmDecrypt(data, key, iv) {
        const importedKey = await this.subtle.importKey("raw", key, { name: "AES-GCM" }, false, ["decrypt"]);
        const decryptedData = await this.subtle.decrypt({ name: "AES-GCM", iv: iv }, importedKey, data);

        return decryptedData;
    }


    /**
    *
    * @returns {exportedKey: ArrayBuffer }
    *
    */
    async generateSymmetricCryptoKey(format = "raw") {
        const key = await this.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
        const exportedKey = await this.subtle.exportKey(format, key);

        return exportedKey;
    }


    /**
    *
    * @param {password: ArrayBuffer}
    * @param {salt: ArrayBuffer}
    * @returns {derivedKey: ArrayBuffer}
    *
    */
    async pbkdf2(password, salt) {
        const pbkdf2Params = { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' }
        const importedKey = await this.subtle.importKey('raw', password, { name: 'PBKDF2' }, false, ["deriveBits"]);
        const derivedKey = await this.subtle.deriveBits(pbkdf2Params, importedKey, 256);

        return derivedKey;
    }


    /**
    *
    * @param {data: ArrayBuffer}
    * @param {publicKey: ArrayBuffer}
    * @returns {encryptedData: ArrayBuffer}
    *
    */
    async rsaEncrypt(data, publicKey) {
        const RsaOaepParams = { name: "RSA-OAEP" };
        const RsaHashedImportParams = { name: "RSA-OAEP", hash: "SHA-256" };

        const importedKey = await this.subtle.importKey("spki", publicKey, RsaHashedImportParams, false, ["encrypt"]);
        const encryptedData = await this.subtle.encrypt(RsaOaepParams, importedKey, data);

        return encryptedData;
    }


    /**
    *
    * @param {data: ArrayBuffer}
    * @param {privateKey: ArrayBuffer}
    * @returns {decryptedData: ArrayBuffer}
    *
    */
    async rsaDecrypt(data, privateKey) {
        const RsaOaepParams = { name: "RSA-OAEP" };
        const RsaHashedImportParams = { name: "RSA-OAEP", hash: "SHA-256" };

        const importedKey = await this.subtle.importKey("pkcs8", privateKey, RsaHashedImportParams, false, ["decrypt"]);
        const decryptedData = await this.subtle.decrypt(RsaOaepParams, importedKey, data);

        return decryptedData;
    }


    /**
    *
    * @returns {[publicKey, privateKey]: String}
    *
    */
    async rsaGenerateKeyPair() {
        const RsaHashedKeyGenParams = {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
            hash: "SHA-256",
        };

        const rsaKeyPair = await this.subtle.generateKey(RsaHashedKeyGenParams, true, ["encrypt", "decrypt"]);
        const publicKey = await this.subtle.exportKey("spki", rsaKeyPair.publicKey);
        const privateKey = await this.subtle.exportKey("pkcs8", rsaKeyPair.privateKey);

        return [publicKey, privateKey];
    }


    /**
    *
    * @param {length: Number}
    * @returns {Uint8Array}
    *
    */
    getRandomBytes(length = 12) {
        const array = new Uint8Array(length);

        return this.crypto.getRandomValues(array);
    }

    /**
    *
    * @param {length: Number}
    * @returns {Uint8Array}
    *
    */
    generateCipherIv(length = 12) {
       return this.getRandomBytes(length);
    }
}
