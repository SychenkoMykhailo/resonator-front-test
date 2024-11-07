import { connectWallet } from "./utils/connectWallet";

import { encryptFile, decryptFile } from "./utils/fileCryption";

import downloadFile from "./utils/downloadFile";

const fileInputEl = document.getElementById("fileInput");
const decryptBtnEl = document.getElementById("decryptBtn");

const userWalletPublicKey = "0x71f8c733898679c2d0bd37ee7c59fbf69aada563";
const userWalletType = "METAMASK";

function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (event) {
      reject(new Error("Failed to read file: " + event.target.error.message));
    };

    reader.readAsArrayBuffer(file);
  });
}

function arrayBufferToFile(arrayBuffer, fileName, mimeType) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

const generateFileSignatureMessage = (publicKey, uid) => {
  return `We use this message to secuerly encrypt and decrypt your files. Subscribe it with your wallet, please.
Wallet adress: ${publicKey}
Unique Identificator: ${uid}`;
};

let uploadedFile = null;
const emulateFileUpload = async (fileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      uploadedFile = fileData;

      resolve(uploadedFile);
    }, 2000);
  });
};

const getUploadedFile = () => uploadedFile;

fileInputEl.onchange = async (event) => {
  const files = event.target.files;

  // TODO validate files
  const formData = new FormData();

  const emcryptUid = new Date().getTime();

  const message = generateFileSignatureMessage(userWalletPublicKey, emcryptUid);

  const { signature } = await connectWallet(userWalletType, message);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    const fileBuffer = await fileToArrayBuffer(file);
    const encryptedUint8Array = await encryptFile(fileBuffer, signature);
    const encryptedBlob = new Blob([encryptedUint8Array], { type: file.type });

    formData.append(`files[${index}][encryptedBlob]`, encryptedBlob);
    formData.append(`files[${index}][originalName]`, file.name);
    formData.append(`files[${index}][encryptUid]`, emcryptUid);
    formData.append(`files[${index}][mimeType]`, file.type);
  }

  const uploadResponse = await fetch(`${window.apiUrl}/upload-files`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await uploadResponse.json();

  console.log("Success:", data);

  // await emulateFileUpload({
  //   encryptedBlob,
  //   uid,
  //   mimeType: type,
  //   originalName: name,
  // });
};

decryptBtnEl.addEventListener("click", async () => {
  const uploadedFile = getUploadedFile();
  if (!uploadedFile) {
    console.log("no uploadedFile");
    return;
  }

  const message = generateFileSignatureMessage(
    userWalletPublicKey,
    uploadedFile.uid
  );

  const { signature } = await connectWallet(userWalletType, message);

  const encryptedBuffer = await uploadedFile.encryptedBlob.arrayBuffer();

  const decryptedBuffer = await decryptFile(encryptedBuffer, signature);

  const decryptedFile = arrayBufferToFile(
    decryptedBuffer,
    uploadedFile.originalName,
    uploadedFile.mimeType
  );

  console.log(decryptedFile);

  downloadFile(decryptedFile, uploadedFile.originalName);
});
