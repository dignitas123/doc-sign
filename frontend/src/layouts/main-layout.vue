<script setup>
import { useWeb3Provider } from 'src/core/composables/web3provider';
import { inject, computed } from 'vue';

const account = inject('account');

const { getProviderAndSigner } = useWeb3Provider();

const accountCut = computed(() => {
  return account.value.slice(0, 4) + '...' + account.value.slice(-4);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" id="mainLayout">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <q-icon size="lg">
              <img src="~assets/docsignlogo.svg" />
            </q-icon>
          </router-link>
        </q-toolbar-title>

        <q-btn flat rounded round dense icon="notifications" class="q-mr-xs">
          <q-badge color="accent" floating>4</q-badge>
        </q-btn>
        <q-btn flat rounded round dense icon="settings" class="q-mr-xs" />
        <q-btn v-if="account" rounded :label="accountCut" color="primary">
          <q-tooltip>
            {{ account }}
          </q-tooltip>
        </q-btn>
        <q-btn
          v-else
          rounded
          unelevated
          label="Connect Wallet"
          class="q-mx-xs bg-secondary text-primary"
          @click="getProviderAndSigner"
        />
      </q-toolbar>
      <q-toolbar>
        <slot name="secondToolbar" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<style>
#mainLayout {
  background: var(--q-info);
}

body {
  font-size: 16px;
  overflow-y: hidden;
}
</style>
