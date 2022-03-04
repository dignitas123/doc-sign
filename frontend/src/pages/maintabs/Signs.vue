<script setup>
import MainLayout from "src/layouts/MainLayout.vue";
import Tabs from "../Tabs.vue";
</script>

<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly"> Signs </q-page>
    <template #secondToolbar>
      <Tabs />
    </template>
  </MainLayout>
</template>
