import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export const useMetamask = () => {
    const getAccount = async () => {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

   return {
    getAccount
   }
}
