<script setup>
import { useWeb3Provider } from "src/core/composables/web3provider";
import { onMounted, provide, ref } from "vue";

const account = ref("");
provide("account", account);

const { getProviderAndSigner } = useWeb3Provider();

onMounted(async () => {
  await getProviderAndSigner();
  const ethereum = window.ethereum;
  if (typeof ethereum !== "undefined") {
    ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length > 0) {
        account.value = accounts[0];
      } else {
        account.value = "";
      }
    });

    ethereum.on("connect", function (connectInfo) {
      console.log(connectInfo);
    });

    if (ethereum.isConnected()) {
      account.value = ethereum.selectedAddress ?? "";
    }
  }
});
</script>

<template>
  <router-view />
</template>
