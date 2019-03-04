import { DearSecretsWebCrypto } from "../src/webcrypto.js";

const staticSymmetricKey = "EVdcI1N8+KRNSECmt6v7EvdDqg7WJjLgbEsPzq2GBVs="

const staticInitializationVector = new Uint8Array([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);

const staticAsymmetricPublicKey = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAleH430ZkdZFAzno3F0QJ+ys18KqDKT+lwbVBwZ1n+0/6yuX+59mSZjMRVZi2zCMln7UbM1xN4yKEaMCaXh5XUT8I8VG/pzBD0soOu/Md8Ijbc83phb17OIp4N7qjzOHjcgp9HvHcOZaWEmSaZLbV9H88lNm5VuAGZ34eoRdrDBBy0CUiXSYjJ2HMx0e/mcTTc247PT7knJCXtgyLRicD4ud3GJOS4TKhxppqO9W6A5z6qsfGzWHHeOarS5KBOoIYEEbvv7gvST+/cUxEAT0hV5+cBNZJ/QsK/kiyLsRyE1GH33R0sHq7Ev+PZkfR/Q/YbD0HoPumUUxUfADxR80EzVi5OQisfK1Y1rGqj2aUCUUiCksk1o9lcjG7M7+p/AQ3HyGEVQPtZUUkYV1JQibHvmWRzUVJqnalFLbTmAjczepOM+PseJcMxmcLfAiRQ34fjkWrlQKYxDOofQXzdrvdBGlVpM0CeymF7xOAfnfkWLAqyyrCjnbGGNVRLCuxrQj9PGGtgnfFPtKmvMGSADrTOgB+tQM099cC6+6yhsoFKA333VKlAjnwUDXVS8i/jkrKAP2kzYW1oINGFycZEPNGAeKT63NvoiKU2eEeqd17zurFiszy6Gklf6Geo3lJVHWUlpbKRcP3iQ+lOeAG295xeqYdSdoxxCFUQ5j8gf7ojacCAwEAAQ==";

const staticAsymmetricPrivateKey = "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";

const staticRsaEncryptedData = "ArkKlAk28HMIp58g7by0ZopIe5AavxNjjeNncuNf0f9WYrQJAkB9q9ZJG1OEs9gJY/Je1RfeOvBRm0mT36+d2O3az0Syp/0MiV6ZG443cEcKmcZz2hXoDby4Xz2BoSO5HGP3Li/o7KnRz0CdOfulOh2kpFWYwcmcd9r+s1iQiwn9yt8+jj0ddw3EwKJ3/NpC2vIBitQIluUxYN8j8tJihPP47+z+BihqdB+GuM5XKyXK7loAFev4kNKUnYiRDStSTlVbB79uAVkEy3zURNG8XWSU3E6Af5EiotJ9GUrd0lOcpZeTVmKhVgUU3z9G07hU6LqqkOQV0x/Ars6ujQRpgrGxz4TJBpb+k3qVShqi2HbocizGm9OKAQ+Y+Cv6N2QsK6RHRQXqUpmwvrjnAQFSbIqCi1U8mz+ODd2+vPpp+s/6C6NCShPy4EEV10DGLdq/ItzVZimqHZ6SxbSBYTXiT3wu/vFo/xeFYJkrxbbXu4p2eE3UKZUg/W3xTw4ZPUL8XufLAhyaxkjNmfrqTkpVfESDek8ZaDNLQMmbkPeJkCg1BX/5Gr9Ycbqfh/3LDXlfUHBVucjY7CNqyRRcZi0SzbJFfEPO/xEz0U3a3xmzvl7cy3wc3DALCefmZPKn9zILbTEiEuRImiB2qEIRS0Q/TH6FwWHlluKTg/x26y2ORps=";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("aes-gcm [encrypt/decrypt]", () => {

    it("should generate symmetric crypto key", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const key = await dearSecrets.generateSymmetricCryptoKey("raw");

        expect(key).toEqual(jasmine.any(ArrayBuffer));
    });

    it("should successfully encrypt data", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const data = Buffer.from("my secret");
        const iv = staticInitializationVector;
        const key = Buffer.from(staticSymmetricKey, "base64");

        const cipherText = await dearSecrets.aesGcmEncrypt(data, key, iv);

        const cipherBuffer = Buffer.from(cipherText);
        const ivBuffer = Buffer.from(iv);

        expect(Buffer.concat([cipherBuffer, ivBuffer]).toString("base64")).toEqual("bbezqrXEZvXE6M1THM5bZyKYqYB13OFfrQABAgMEBQYHCAkKCw==");
    });

    it("should successfully decrypt data", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const data = Buffer.from("bbezqrXEZvXE6M1THM5bZyKYqYB13OFfrQ==", "base64");
        const iv = staticInitializationVector;
        const key = Buffer.from(staticSymmetricKey, "base64");

        const decipherText = await dearSecrets.aesGcmDecrypt(data, key, iv);

        const buffer = Buffer.from(decipherText);

        expect(buffer.toString("utf8")).toEqual("my secret");
    });
});

describe("rsa [encrypt/decrypt]", () => {

    it("should generate asymmetric crypto key pair in to jwk", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const keyPair = await dearSecrets.rsaGenerateKeyPair();

        expect(keyPair[0]).toEqual(jasmine.any(ArrayBuffer));
        expect(keyPair[1]).toEqual(jasmine.any(ArrayBuffer));
    });

    it("should successfully encrypt and decrypt data with rsa key pair", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const data = Buffer.from("my secret");
        const publicKey = Buffer.from(staticAsymmetricPublicKey, "base64");
        const privateKey = Buffer.from(staticAsymmetricPrivateKey, "base64");

        const cipherText = await dearSecrets.rsaEncrypt(data, publicKey);

        const decipherText = await dearSecrets.rsaDecrypt(cipherText, privateKey);

        const buffer = Buffer.from(decipherText);

        expect(buffer.toString("utf8")).toEqual("my secret");
    });

    it("should successfully decrypt data with rsa private key", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const cipherText = new Uint8Array(Buffer.from(staticRsaEncryptedData, "base64"));;
        const privateKey = Buffer.from(staticAsymmetricPrivateKey, "base64");

        const decipherText = await dearSecrets.rsaDecrypt(cipherText, privateKey);

        const buffer = Buffer.from(decipherText);

        expect(buffer.toString("utf8")).toEqual("my secret");
    });
});

describe("hashing functions", () => {

    it("should derive key using pbkdf2", async () => {
        const dearSecrets = new DearSecretsWebCrypto();

        const password = Buffer.from("password");
        const salt = Buffer.from("qwertyuiopasdfgh");
        const derivedKey = await dearSecrets.pbkdf2(password, salt);

        const buffer = Buffer.from(derivedKey);

        expect(buffer.toString("base64")).toEqual("EVdcI1N8+KRNSECmt6v7EvdDqg7WJjLgbEsPzq2GBVs=");
    });
});

