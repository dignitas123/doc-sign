<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>

        <q-toolbar-title>
          <q-icon class="text-dark" size="lg">
            <img src="~assets/docsignlogo.svg" />
          </q-icon> <span class="gt-xs">Doc Sign</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="notifications" class="q-mr-xs" >
          <q-badge color="accent" floating>4</q-badge>
        </q-btn>
        <q-btn flat round dense icon="settings" class="q-mr-xs" />
        <q-btn unelevated rounded color="secondary" label="Connect Wallet" class="q-mx-md" />
      </q-toolbar>
    </q-header>
    <q-page-container>
        <q-toolbar>
          <q-tabs
              v-model="tab"
              class="absolute-center"
            >
              <q-route-tab label="Documents" to="/documents" exact active />
              <q-route-tab label="Signs" to="/signs" exact />
          </q-tabs>
        </q-toolbar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    return {
      tab: ref('mails')
    }
  }
})
</script>

