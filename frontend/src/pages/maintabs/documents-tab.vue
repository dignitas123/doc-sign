<script setup>
import MainLayout from 'src/layouts/MainLayout.vue';
import Tabs from '../main-tabs.vue';
</script>

<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly">
      <q-btn
        class="absolute"
        rounded
        style="top: 20px"
        to="/documents/create"
        unelevated
        label="Create a new Document"
        icon-right="add"
        color="accent"
      />
    </q-page>
    <template #secondToolbar>
      <Tabs />
    </template>
  </MainLayout>
</template>
