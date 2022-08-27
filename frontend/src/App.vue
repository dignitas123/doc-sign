<script setup>
// import { useWeb3Provider } from 'src/core/composables/web3provider';
import { onMounted, provide, ref } from 'vue';

const account = ref('');
provide('account', account);

// const { getProviderAndSigner } = useWeb3Provider();

onMounted(async () => {
  // const { provider, signer } = await getProviderAndSigner();
  // provider and signer can be provided. not in use yet

  const { ethereum } = window;
  if (typeof ethereum !== 'undefined') {
    ethereum.on('accountsChanged', (accounts) => {
      if (!!accounts.length) {
        account.value = accounts[0];
      } else {
        account.value = '';
      }
    });

    ethereum.on('connect', (connectInfo) => {
      console.log('connected. Info', connectInfo);
    });

    if (ethereum.isConnected()) {
      account.value = ethereum.selectedAddress ?? '';
    }
  }
});
</script>

<template>
  <router-view />
</template>
