<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Web3 from 'web3';
// import provider from 'web3/types'

export default defineComponent({
  name: 'App',
  setup() {
    const web3 = new Web3();

    console.log(web3);
  }
})
</script>
