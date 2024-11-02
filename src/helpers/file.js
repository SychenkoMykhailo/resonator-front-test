export function fileToArrayBuffer(file) {
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

export function arrayBufferToFile(arrayBuffer, fileName, mimeType) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}
