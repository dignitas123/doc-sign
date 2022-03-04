import { ethers } from "ethers";

export function useWeb3Provider() {
  async function getProviderAndSigner() {
    if (typeof window.ethereum !== "undefined") {
      handleEthereum();
    } else {
      window.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });
      alert(
        "You have to install Metamask Extension on Chrome to use this website. https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=de"
      );
      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(handleEthereum, 15000); // 15 seconds
    }

    async function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner();

        return {
          provider,
          signer,
        };
      } else {
        alert(
          "You have to install Metamask Extension on Chrome to use this website. https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=de"
        );
      }
    }
  }

  return {
    getProviderAndSigner,
  };
}
