<script setup lang="ts">
import { useQuasar, QUploader } from 'quasar';
import { ref, reactive, withDefaults, computed } from 'vue';
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
      maxFileSize: 5,
      uploadMultiple: 1,
    })
  );
}

const val = ref<FileRowModel>(getModelValue());

const fileUploader = ref<QUploader | null>(null);

const $q = useQuasar();

function onRejected(
  rejectedEntries: { failedPropValidation: string; file: File }[]
) {
  let maxFiles = false;
  rejectedEntries.forEach((entry) => {
    if (entry.failedPropValidation === 'max-files') {
      maxFiles = true;
    }
  });
  let message = `${rejectedEntries.length} file(s) did not pass validation constraints`;
  if (maxFiles) {
    message = `You can only upload ${
      val.value.uploadMultiple
    } files at the same time. You uploaded ${
      rejectedEntries.length + val.value.uploadMultiple
    } files.`;
  }
  $q.notify({
    type: 'negative',
    message: message,
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

const allFileEndingsText = computed(() => {
  return val.value.allowedEndings.length
    ? val.value.allowedEndings.reduce(
        (previousValue, currentValue) => previousValue + ' ' + currentValue
      )
    : val.value.allowOnlyImages
    ? 'image/*'
    : '';
});
</script>

<template>
  <div class="row justify-center">
    <q-uploader
      ref="fileUploader"
      style="max-width: 300px"
      :label="val.name"
      hide-upload-btn
      multiple
      batch
      :max-files="val.uploadMultiple"
      :accept="allFileEndingsText"
      @rejected="onRejected"
      @added="onAdded"
      @removed="onRemoved"
    >
      <template v-if="!fileUploaded" #list>
        <div class="upload-info" @click="triggerPickFiles">
          <div class="text-center">
            <div class="text-caption">
              Drag and Drop
              {{ val.uploadMultiple > 1 ? 'files' : 'file' }} here.
            </div>
            <div class="subtitle-1">
              Max File Size: {{ val.maxFileSize }} MB
            </div>
            <div v-if="val.uploadMultiple > 1" class="subtitle-1">
              Multiple Uploads: {{ val.uploadMultiple }}
            </div>
            <div
              v-if="val.allowedEndings.length > 0 && !val.allowAllEndings"
              class="subtitle-2"
            >
              Allowed files: {{ allFileEndingsText }}
            </div>
            <div v-else-if="val.allowOnlyImages" class="subtitle-2">
              Only images allowed
            </div>
          </div>
        </div>
      </template>
    </q-uploader>
  </div>
</template>

<style lang="scss" scoped>
.upload-info {
  min-height: 60px;
  &:hover {
    cursor: pointer;
  }
  color: $info-gray;
}
</style>
