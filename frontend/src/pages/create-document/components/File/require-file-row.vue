<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, reactive, ref, watch, withDefaults } from 'vue';
import ConfirmCancel from 'src/core/components/confirm-cancel.vue';
import { FileRowModel, uploadMultipleOptions } from './require-file-row.model';
import { RequireField } from '../../create-document.model';
import HyphenText from 'src/core/components/hyphen-text.vue';
import FileRow from './file-row.vue';

const $q = useQuasar();

const props = withDefaults(
  defineProps<{
    modelValue?: FileRowModel | undefined;
    preview?: boolean;
    label?: string;
    placeholder?: string;
    editActive?: boolean;
  }>(),
  {
    modelValue: undefined,
    preview: false,
    label: 'Input Label',
    placeholder: 'Name, Address ..',
    editActive: false,
  }
);

const emit = defineEmits([
  'update:modelValue',
  'add',
  'delete',
  'change',
  'close',
  'duplicate',
]);

const val = ref(getModelValue());
const startValue = ref();

const fileDescription = ref<HTMLElement | null>(null);

onMounted(() => {
  if (fileDescription.value) {
    fileDescription.value.focus();
  }

  startValue.value = { ...val.value };
  editActiveValue.value = props.editActive;
});

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

const endingName = ref('');

const endingExistsValues = ref<boolean[]>([]);

watch(
  () => val.value.allowedEndings,
  () => {
    if (!val.value.allowedEndings.length) {
      val.value.allowAllEndings = true;
    }
  },
  { deep: true }
);

function addEnding() {
  if (endingName.value) {
    if (val.value.allowAllEndings) {
      val.value.allowAllEndings = false;
    }
    if (val.value.allowOnlyImages) {
      val.value.allowOnlyImages = false;
    }
    if (
      /[$&+,:;=?@#|'<>^*()%!-]|[.](?![a-zA-Z0-9])|([a-zA-Z0-9])(?!==)[.]/.test(
        endingName.value
      )
    ) {
      $q.notify({
        type: 'negative',
        message: 'Special characters in file endings are not allowed.',
        timeout: 500,
      });
    } else {
      if (/^\./.test(endingName.value)) {
        if (endingName.value.length < 7) {
          if (!val.value.allowedEndings.includes(endingName.value)) {
            val.value.allowedEndings.push(endingName.value);
            endingExistsValues.value.push(true);
            endingName.value = '';
          } else {
            $q.notify({
              type: 'negative',
              message: `${endingName.value} already exists.`,
              timeout: 500,
            });
          }
        } else {
          $q.notify({
            type: 'negative',
            message: "A file ending can't have more than 5 characters.",
            timeout: 500,
          });
        }
      } else {
        if (!val.value.allowedEndings.includes('.' + endingName.value)) {
          val.value.allowedEndings.push('.' + endingName.value);
          endingExistsValues.value.push(true);
          endingName.value = '';
        } else {
          $q.notify({
            type: 'negative',
            message: `${endingName.value} already exists.`,
            timeout: 500,
          });
        }
      }
    }
  } else {
    $q.notify({
      type: 'negative',
      message: 'You cannot add an empty file ending.',
      timeout: 500,
    });
  }
}

const fileDescriptionFocused = ref(false);
function focusFileDescription() {
  fileDescriptionFocused.value = true;
}
function unFocusFileDescription() {
  fileDescriptionFocused.value = false;
}

const fileEndingFocused = ref(false);
function focusFileEnding() {
  fileEndingFocused.value = true;
}
function unfocusFileEnding() {
  fileEndingFocused.value = false;
}

function itemRemoved(index: number) {
  val.value.allowedEndings.splice(index, 1);
  endingExistsValues.value.splice(index, 1);
}

const endingNameInput = ref<HTMLDivElement | null>(null);

const editActiveValue = ref(false);

function setEditActive() {
  editActiveValue.value = true;
}

function duplicateRow() {
  emit('duplicate', RequireField.File, val.value);
}

const validated = computed(() => {
  return !!val.value.name.length;
});

const validationMessages = computed(() => {
  return validated.value ? [''] : ["Name of file require can't be empty."]; // maybe something else??
});

const deleteConfirm = ref(false);

function requireFileRowClosed(data: {
  type: RequireField;
  value: FileRowModel;
}) {
  editActiveValue.value = false;
  val.value = data.value;
}

function saveChanges() {
  if (validated.value) {
    editActiveValue.value = false;
    if (val.value.allowAllEndings) {
      endingExistsValues.value = [];
      val.value.allowedEndings = [];
    }
    emit('close', { type: RequireField.File, value: val.value });
  }
}

function closeWindow() {
  if (editActiveValue.value) {
    val.value = startValue.value;
    editActiveValue.value = false;
  }
  emit('close', { type: RequireField.File, value: startValue.value });
}

function addPreviewComponent() {
  if (val.value.allowAllEndings) {
    endingExistsValues.value = [];
    val.value.allowedEndings = [];
  }
  emit('add', RequireField.File, {
    validated: validated.value,
    messages: validationMessages.value,
  });
}

function deleteInputFieldRow() {
  emit('delete', {
    type: RequireField.File,
    name: val.value.name,
  });
}

const fileMarkerLabel = {
  1: '1',
  100: '100',
};

watch(
  () => val.value.maxFileSize,
  () => {
    if (val.value.maxFileSize > 100) {
      val.value.maxFileSize = 100;
    }
  }
);

watch(
  () => val.value.allowOnlyImages,
  (now, prev) => {
    if (now && !prev && val.value.allowAllEndings) {
      val.value.allowAllEndings = false;
    }
  }
);

watch(
  () => val.value.allowAllEndings,
  (now, prev) => {
    if (now && !prev && val.value.allowOnlyImages) {
      val.value.allowOnlyImages = false;
    }
  }
);
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end" style="margin-bottom: 2px">
      <q-btn dense flat icon="edit" size="xs" @click="setEditActive"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Edit</q-tooltip></q-btn
      >
      <q-btn dense flat icon="content_copy" size="xs" @click="duplicateRow"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Duplicate</q-tooltip></q-btn
      >
      <q-btn dense flat icon="delete" size="xs" @click="deleteConfirm = true"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Delete</q-tooltip></q-btn
      >
    </div>
    <div v-if="editActiveValue" class="dotted-border">
      <RequireFileRow v-model="val" @close="requireFileRowClosed" editActive />
    </div>
    <FileRow v-else v-model="val" />
  </template>
  <template v-else>
    <div class="require-file-row">
      <HyphenText class="q-mt-xs q-mb-md">Preview</HyphenText>
      <FileRow v-model="val" preview />
      <div class="row q-my-md justify-between">
        <div class="col-7 self-center">
          <q-checkbox
            v-model="val.allowAllEndings"
            label="Allow all file endings"
            color="primary"
          />
          <q-checkbox
            v-model="val.allowOnlyImages"
            label="Allow only images"
            color="primary"
          />
        </div>
        <div class="col-3 self-center">
          <q-select
            v-model="val.uploadMultiple"
            :options="uploadMultipleOptions"
            label="Multiple Uploads"
          />
        </div>
      </div>
      <div class="row justify-between q-mb-sm">
        <div class="col-xs-12 col-sm-7 self-center text-center">
          <q-slider
            v-model="val.maxFileSize"
            :min="0"
            :max="100"
            :step="5"
            :marker-labels="fileMarkerLabel"
            markers
            label
            :label-value="val.maxFileSize + ' MB'"
            color="primary"
          />
        </div>
        <div class="col-xs-12 col-sm-4 text-center">
          <q-input
            ref="fileDescription"
            v-model="val.maxFileSize"
            outlined
            label="Max File Size"
            mask="###"
          >
            <template #append>MB</template>
          </q-input>
        </div>
      </div>
      <div
        v-if="val.allowedEndings.length && !val.allowAllEndings"
        class="row justify-center"
      >
        <div v-for="(name, i) in val.allowedEndings" :key="i">
          <q-chip
            removable
            outline
            v-model="endingExistsValues[i]"
            color="primary"
            text-color="white"
            :label="name"
            :title="name"
            @remove="itemRemoved(i)"
          />
        </div>
      </div>
      <div class="row q-mb-sm">
        <div class="col-xs-12 col-sm-6">
          <q-input
            ref="fileDescription"
            v-model="val.name"
            outlined
            label="File Description"
            @focus="focusFileDescription"
            @blur="unFocusFileDescription"
            @keydown.enter.prevent="endingNameInput?.focus()"
            maxlength="63"
          />
        </div>
        <div
          class="col text-center q-ml-xs justify-end"
          :class="{ 'q-mt-xs': $q.screen.lt.sm }"
          style="display: inline-flex"
        >
          <q-input
            ref="endingNameInput"
            v-model="endingName"
            outlined
            :label="
              fileEndingFocused ? 'Allowed File Type Ending' : 'png, pdf, .. '
            "
            @focus="focusFileEnding"
            @blur="unfocusFileEnding"
            @keydown.enter.prevent="addEnding"
            maxlength="5"
          />
          <q-btn
            class="q-ml-xs"
            unelevated
            outline
            icon="add"
            @click="
              addEnding();
              endingNameInput?.focus();
            "
          />
        </div>
      </div>
      <HyphenText />
      <ConfirmCancel
        v-if="editActiveValue"
        confirmText="Save Changes"
        @confirm="saveChanges"
        @cancel="closeWindow"
      />
      <ConfirmCancel
        v-else
        confirmText="Add"
        @confirm="addPreviewComponent"
        @cancel="closeWindow"
      />
    </div>
  </template>
  <q-dialog v-model="deleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to delete this row?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          outline
          label="Delete"
          color="accent"
          v-close-popup
          @click="deleteInputFieldRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-chip {
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 2px;
  height: 25px;
}

.require-file-row {
  max-height: calc(100vh - 155px);
  overflow-y: auto;
}
</style>
