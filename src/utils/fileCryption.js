const signatureToKeyIV = (signature) => {
  const hexSignature = signature.slice(2);

  const key = hexSignature.slice(0, 64);
  const iv = hexSignature.slice(64, 96);
  const keyBuffer = Buffer.from(key, "hex");
  const ivBuffer = Buffer.from(iv, "hex");

  return { keyBuffer, ivBuffer };
};

export async function encryptFile(fileData, signature) {
  const { keyBuffer, ivBuffer } = signatureToKeyIV(signature);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBuffer },
    cryptoKey,
    fileData
  );

  return new Uint8Array(encryptedData);
}

export async function decryptFile(encryptedData, signature) {
  const { keyBuffer, ivBuffer } = signatureToKeyIV(signature);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    cryptoKey,
    encryptedData
  );

  return new Uint8Array(decryptedData);
}
