export const walletTypes = {
  METAMASK: "METAMASK",
  TRUST_WALLET: "TRUST_WALLET",
  PHANTOM: "PHANTOM",
  RABBY_WALLET: "RABBY_WALLET",
};

export const etheriumWallets = [
  walletTypes.METAMASK,
  walletTypes.TRUST_WALLET,
  walletTypes.RABBY_WALLET,
];

export const solanaWallets = [walletTypes.PHANTOM];

export const apiUrl = "http://localhost:8000";

export const authMessage =
  "Please sign this message to authenticate with our service.";
