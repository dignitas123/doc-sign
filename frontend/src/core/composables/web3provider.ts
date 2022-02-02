import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export const useWeb3Provider = () => {
  const getAccount = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      alert(
        "You have no Wallet Extension installed, please install Metamask Browserextension in Chrome to continue."
      );
      // TODO: install prompt for different wallet extensions (to also work on safari)
    }
  };

  return {
    getAccount,
  };
};
