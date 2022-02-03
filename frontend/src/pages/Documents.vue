<template>
  <q-page class="row items-center justify-evenly">
    <q-uploader
      label="UPLOAD YOUR DOCUMENT"
      style="max-width: 300px"
      accept=".jpg, .png, .pdf"
      max-file-size="10000000"
      @rejected="onRejected"
      @added="onAdded"
      @removed="onRemoved"
    >
      <template v-if="noFileUploaded" #list>
        <div class="text-info absolute-center">
          Drag and Drop<br />.png, .jpg, .pdf
        </div>
      </template>
    </q-uploader>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { File, RejectedFile } from "./Documents.model";

export default defineComponent({
  name: "PageIndex",
  components: {},
  setup() {
    const $q = useQuasar();

    const noFileUploaded = ref(true);

    function onRejected(rejectedEntries: RejectedFile[]) {
      console.log("rejected entry", rejectedEntries)
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      if(Array.isArray(rejectedEntries)) {
        let reason = "";
        if(rejectedEntries[0].failedPropValidation === "max-file-size")
          reason = "File too large (max size: 10mb)"
        $q.notify({
          type: "negative",
          message: `${rejectedEntries.length} file(s) did not pass validation constraints. ${reason ? 'Reason: ' + reason + '.': ''}`,
        });
      }
    }

    function onAdded(files: File[]) {
      console.log("file added:", files);
      noFileUploaded.value = false;
    }

    function onRemoved() {
      noFileUploaded.value = true;
    }

    return { noFileUploaded, onRejected, onAdded, onRemoved };
  },
});
</script>
