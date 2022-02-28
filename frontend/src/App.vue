<template>
  <router-view />
</template>

<script lang="ts">
import { useWeb3Provider } from "src/core/composables/web3provider";
import { defineComponent, onMounted, provide, ref } from "vue";

export default defineComponent({
  name: 'App',
  setup() {
    const account = ref("");
    provide("account", account);
    
    const { getAccount } = useWeb3Provider();

    onMounted(async () => {
      await getAccount();
      const ethereum = window.ethereum;
      if (typeof ethereum !== "undefined") {
        ethereum.on("accountsChanged", function (accounts) {
          let accountArr = accounts as string[];
          if (accountArr.length > 0) {
            account.value = accountArr[0];
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
  },
});
</script>
