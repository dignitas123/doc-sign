<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly"> Signs </q-page>
    <template #secondToolbar>
      <Tabs />
    </template>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
import Tabs from "../Tabs.vue";

export default defineComponent({
  name: "PageIndex",
  components: { MainLayout, Tabs },
  setup() {
    return {};
  },
});
</script>
