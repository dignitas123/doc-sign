<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, reactive, withDefaults } from 'vue';
import { FileRowModel } from './require-file-row.model';

const props = withDefaults(
  defineProps<{
    modelValue?: FileRowModel | undefined;
    preview?: boolean;
  }>(),
  {
    modelValue: undefined,
    preview: false,
  }
);

defineEmits(['update:modelValue']);

function getModelValue() {
  return (
    props.modelValue ??
    reactive({
      name: '',
      allowAllEndings: false,
      allowedEndings: reactive([]),
    })
  );
}

const val = ref(getModelValue());

const $q = useQuasar();

function onRejected(rejectedEntries: any) {
  console.log('rejectedEntries', rejectedEntries);
  console.log('type of rejectedEntries', typeof rejectedEntries);
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}
</script>

<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-6 q-mb-xs">
      <p class="q-my-xs">
        <b>{{ val.name }}:</b>
      </p>
    </div>
    <div
      class="col-xs-12 col-sm-6 q-mb-xs"
      :style="$q.screen.xs ? 'max-width: 270px;' : ''"
    >
      <q-uploader
        style="max-width: 300px"
        url="http://localhost:4444/upload"
        label="Restricted to images"
        multiple
        accept=".jpg, image/*"
        @rejected="onRejected"
      />
    </div>
    {{ val }}
  </div>
</template>
