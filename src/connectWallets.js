import { walletTypes, apiUrl, authMessage } from "./constants";

import { connectWallet } from "./utils/connectWallet";

const apiUrl = window.apiUrl;

const sendUserData = async (publicKey, signature, walletType) => {
  const formData = new FormData();
  formData.append("walletPublicKey", publicKey);
  formData.append("signature", signature);
  formData.append("walletType", walletType);

  try {
    const response = await fetch(`${apiUrl}/auth/wallet`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const handleConnectWallet = async (walletType) => {
  try {
    const { publicKey, signature } = await connectWallet(
      walletType,
      authMessage
    );

    sendUserData(publicKey, signature, walletType);
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};

document
  .getElementById("metaMaskButton")
  .addEventListener("click", async () => {
    await handleConnectWallet(walletTypes.METAMASK);
  });
document
  .getElementById("trustWalletButton")
  .addEventListener("click", async () => {
    await handleConnectWallet(walletTypes.TRUST_WALLET);
  });
document.getElementById("phantomButton").addEventListener("click", async () => {
  await handleConnectWallet(walletTypes.PHANTOM);
});
document
  .getElementById("rabbyWalletButton")
  .addEventListener("click", async () => {
    await handleConnectWallet(walletTypes.RABBY_WALLET);
  });
