import { ethers } from "ethers";

export const signMessageEthereum = async (message) => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.listAccounts();
  const etheriumPublicKey = accounts[0];

  const signer = await provider.getSigner();
  const signature = await signer.signMessage(message);

  return { etheriumPublicKey, signature };
};

export const signMessageSolana = async (message) => {
  await window.solana.connect();
  const solanaPublicKey = window.solana.publicKey.toString();

  const message_encoded = new TextEncoder().encode(message);

  const signature = await window.solana.signMessage(message_encoded);

  return { solanaPublicKey, signature };
};
