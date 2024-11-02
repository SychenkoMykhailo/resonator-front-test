import { walletTypes } from "../constants";

export const checkEtheriumWalletInstalled = (walletType) => {
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

export const checkSolanaWalletInsalled = (walletType) => {
  const isPhantom = window.solana && window.solana.isPhantom;

  if (walletType === walletTypes.PHANTOM && !isPhantom) {
    throw new Error("Phantom wallet is not installed or not detected.");
  }
};
