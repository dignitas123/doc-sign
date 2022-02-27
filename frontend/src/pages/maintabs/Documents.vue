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

<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
import Tabs from "../Tabs.vue";

export default defineComponent({
  name: "PageIndex",
  components: { MainLayout, Tabs },
  setup() {
    function linkClick() {
      console.log("link clicked");
    }

    return { linkClick };
  },
});
</script>
