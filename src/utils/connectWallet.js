import { etheriumWallets, solanaWallets, walletTypes } from "../constants";
import { signMessageEthereum, signMessageSolana } from "./signature";

import bs58 from "bs58";

const checkEtheriumWalletInstalled = (walletType) => {
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
  const isRabby = window.ethereum && window.ethereum.isRabby;
  const isTrust = window.ethereum && window.ethereum.isTrust;

  if (walletType === walletTypes.METAMASK && !isMetaMask) {
    throw new Error("MetaMask is not installed or not detected.");
  }
  if (walletType === walletTypes.RABBY_WALLET && !isRabby) {
    throw new Error("Rabby Wallet is not installed or not detected.");
  }
  if (walletType === walletTypes.TRUST_WALLET && !isTrust) {
    throw new Error("Trust Wallet is not installed or not detected.");
  }
};

const checkSolanaWalletInsalled = (walletType) => {
  const isPhantom = window.solana && window.solana.isPhantom;

  if (walletType === walletTypes.PHANTOM && !isPhantom) {
    throw new Error("Phantom wallet is not installed or not detected.");
  }
};

export async function connectWallet(walletType, message) {
  try {
    if (etheriumWallets.includes(walletType)) {
      checkEtheriumWalletInstalled();

      const { etheriumPublicKey, signature } = await signMessageEthereum(
        message
      );

      return {
        publicKey: etheriumPublicKey.address,
        signature,
        walletType,
      };
    } else if (solanaWallets.includes(walletType)) {
      checkSolanaWalletInsalled();

      const { solanaPublicKey, signature } = await signMessageSolana(message);

      return {
        publicKey: solanaPublicKey,
        signature: bs58.encode(signature.signature),
        walletType,
      };
    } else {
      throw new Error("Unsupported wallet type");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
}
