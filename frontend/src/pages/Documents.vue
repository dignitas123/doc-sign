<template>
  <q-page class="row items-center justify-evenly">
    <q-uploader
      label="UPLOAD YOUR DOCUMENT"
      style="max-width: 300px"
    >
      <template #list>
        <div class="text-info absolute-center">
          Drag and Drop<br />[.png, .jpg, .pdf]
        </div>
      </template>
    </q-uploader>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: {},
  setup() {
    return {};
  },
});
</script>
