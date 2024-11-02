import { etheriumWallets, solanaWallets } from "../constants";
import { signMessageEthereum, signMessageSolana } from "./signature";
import {
  checkEtheriumWalletInstalled,
  checkSolanaWalletInsalled,
} from "./checkWalletInstalled";

export async function connectWallet(walletType, message) {
  try {
    if (etheriumWallets.includes(walletType)) {
      checkEtheriumWalletInstalled();

      const { etheriumPublicKey, signature } = await signMessageEthereum(
        message
      );

      return {
        publicKey: etheriumPublicKey,
        signature,
        walletType,
      };
    } else if (solanaWallets.includes(walletType)) {
      checkSolanaWalletInsalled();

      const { solanaPublicKey, signature } = await signMessageSolana(message);

      return {
        publicKey: solanaPublicKey,
        signature,
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
