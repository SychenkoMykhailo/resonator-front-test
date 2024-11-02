import { walletTypes, apiUrl, authMessage } from "./constants";

import { connectWallet } from "./utils/connectWallet";

// const addScript = (src) => {
//   const script = document.createElement("script");
//   script.src = src;
//   document.head.appendChild(script);
// };

// addScript(
//   "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.13.4/ethers.umd.min.js"
// );
// addScript(
//   "https://cdn.jsdelivr.net/npm/@solana/web3.js@1.33.0/lib/index.iife.js"
// );

const sendUserData = async (publicKey, signature, walletType) => {
  const userData = {
    walletPublicKey: publicKey.address,
    signature,
    message: authMessage,
    walletType,
  };

  console.log(userData);
  // fetch(`${apiUrl}/auth/wallet`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
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
