"use strict";
const crypto = require('crypto');
const forge = require("node-forge");

class DearSecretsNodeCrypto {
    constructor() {

    }

    /**
    *
    * @param {data: Buffer}
    * @param {key: Buffer}
    * @param {iv: Buffer}
    * @returns {encryptedData: Buffer}
    *
    */
    aesGcmEncrypt(data, key, iv) {
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const encryptedSecret = Buffer.concat([cipher.update(data), cipher.final()]);
        const tag = cipher.getAuthTag();

        return Promise.resolve(Buffer.concat([encryptedSecret, tag, iv]));
    }

    /**
    *
    * @param {data: Buffer}
    * @param {key: Buffer}
    * @param {iv: Buffer}
    * @param {tag: Buffer}
    * @returns {decryptedData: Buffer}
    *
    */
    aesGcmDecrypt(data, key, iv, tag) {
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        return Promise.resolve(Buffer.concat([decipher.update(data), decipher.final()]));
    }

    /**
    *
    * @param {password: Buffer}
    * @param {salt: Buffer}
    * @returns {derivedKey: Buffer}
    *
    */
    pbkdf2(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 32, 'sha256', (err, derivedKey) => {
                if (err) return reject(err);

                resolve(derivedKey);
            });
        });
    }

    /**
    *
    * @param {data: Buffer}
    * @param {publicKey: Buffer}
    * @returns {encryptedData: Buffer}
    *
    */
    rsaEncrypt(data, publicKey) {
        const der = forge.util.decode64(publicKey);
        const asn1 = forge.asn1.fromDer(der);
        const publicKeyAsn1 = forge.pki.publicKeyFromAsn1(asn1);
        const publicKeyPem = forge.pki.publicKeyToPem(publicKeyAsn1);
        const publicKeyObject = forge.pki.publicKeyFromPem(publicKeyPem);

        const cipher = publicKeyObject.encrypt(data, 'RSA-OAEP', {
            md: forge.md.sha256.create()
        });
        return Promise.resolve(cipher);
    }

    /**
    *
    * @param {data: Buffer}
    * @param {privateKey: Buffer}
    * @returns {decryptedData: Buffer}
    *
    */
    rsaDecrypt(data, privateKey) {
        const der = forge.util.decode64(privateKey);
        const asn1 = forge.asn1.fromDer(der);
        const privateKeyAsn1 = forge.pki.privateKeyFromAsn1(asn1);
        const rsaPrivateKey = forge.pki.privateKeyToAsn1(privateKeyAsn1);
        const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
        const privateKeyPem = forge.pki.privateKeyInfoToPem(privateKeyInfo);
        const privateKeyObject = forge.pki.privateKeyFromPem(privateKeyPem);

        const decipher = privateKeyObject.decrypt(data, 'RSA-OAEP', {
            md: forge.md.sha256.create()
        });
        return Promise.resolve(decipher);
    }

    rsaGenerateKeyPair() {

    }
}

module.exports = DearSecretsNodeCrypto;
