<script setup lang="ts">
import { useQuasar, QUploader } from 'quasar';
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
    reactive<FileRowModel>({
      name: '',
      allowAllEndings: true,
      allowOnlyImages: false,
      allowedEndings: [],
      maxFileSize: 10_000,
      uploadMultiple: 1,
    })
  );
}

const val = ref<FileRowModel>(getModelValue());

const fileUploader = ref<QUploader | null>(null);

const $q = useQuasar();

function onRejected(rejectedEntries: any) {
  console.log('rejectedEntries', rejectedEntries);
  console.log('type of rejectedEntries', typeof rejectedEntries);
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}

const fileUploaded = ref(false);

async function onAdded() {
  fileUploaded.value = true;
}

function onRemoved() {
  fileUploaded.value = false;
}

function triggerPickFiles() {
  fileUploader.value?.pickFiles();
}
</script>

<template>
  <div class="row justify-center">
    <q-uploader
      ref="fileUploader"
      style="max-width: 300px"
      :label="val.name"
      multiple
      :accept="
        val.allowedEndings.length
          ? val.allowedEndings.reduce(
              (previousValue, currentValue) =>
                previousValue + ' ' + currentValue
            )
          : ''
      "
      @rejected="onRejected"
      @added="onAdded"
      @removed="onRemoved"
    >
      <template v-if="!fileUploaded" #list>
        <div class="upload-info" @click="triggerPickFiles">
          <div class="text-center">
            <div class="text-caption">Drag and Drop file here.</div>
            <div class="subtitle-1">Drag and Drop file here.</div>
          </div>
        </div>
      </template>
    </q-uploader>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';
.upload-info {
  min-height: 60px;
  &:hover {
    cursor: pointer;
  }
  color: $info-gray;
}
</style>
