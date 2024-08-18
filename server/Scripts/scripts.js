const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

// Generate a random private key and write it in Hex
const privateKey = secp.utils.randomPrivateKey();

console.log('PrivateKey: ', toHex(privateKey));

// Get the public key from the Private Key

const publicKey = secp.getPublicKey(privateKey);

console.log('PublicKey ', toHex(publicKey))