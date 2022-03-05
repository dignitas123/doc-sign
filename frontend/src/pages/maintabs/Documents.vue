<script setup>
import MainLayout from "src/layouts/MainLayout.vue"
import Tabs from "../Tabs.vue"
</script>

<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly">
      <q-btn
        class="absolute"
        style="top: 20px"
        to="/documents/create"
        label="Create a new Document"
        icon-right="add"
        glossy
        color="accent"
      />
    </q-page>
    <template #secondToolbar>
      <Tabs />
    </template>
  </MainLayout>
</template>
