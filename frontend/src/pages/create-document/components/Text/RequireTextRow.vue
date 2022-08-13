<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue';
import RequireTextRow from './RequireTextRow.vue';
import { useQuasar } from 'quasar';
import { RequireField } from '../../create-document.model';
import ConfirmCancel from 'src/core/components/confirm-cancel.vue';

const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  preview: {
    type: Boolean,
    default: false,
  },
  editActive: {
    type: Boolean,
    default: false,
  },
});

const editorRef = ref();
watch(editorRef, () => {
  editorRef.value.focus();
});

const emit = defineEmits([
  'update:modelValue',
  'add',
  'delete',
  'change',
  'close',
  'duplicate',
]);

const val = ref(props.modelValue);
const startValue = ref();

onMounted(() => {
  startValue.value = { ...val.value };
  editActiveValue.value = props.editActive;
});

const toolbarTextDesktopItems = ref([
  ['link'],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7',
      ],
    },
  ],
  ['unordered', 'ordered', 'outdent', 'indent'],
]);

const editorToolBarItems = computed(() => {
  return reactive([
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify'],
      },
    ],
    ['bold', 'italic', 'underline'],
    ...($q.screen.lt.sm ? [] : toolbarTextDesktopItems.value),
  ]);
});

const validated = computed(() => {
  return !!val.value.text.length;
});

const validationMessage = computed(() => {
  return validated.value ? '' : "Text Field can't be empty.";
});

const editActiveValue = ref(props.editActive);

function setEditActive() {
  editActiveValue.value = true;
}

function deleteTextRow() {
  emit('delete', {
    type: RequireField.Text,
    name: val.value.text,
  });
}

function addPeComponent() {
  emit('add', RequireField.Text, {
    validated: validated.value,
    message: validationMessage.value,
  });
}

const deleteConfirm = ref(false);
const saveChangesWithoutSavingConfirm = ref(false);

function saveChanges() {
  if (validated.value) {
    editActiveValue.value = false;
    emit('close', RequireField.Text, val.value);
  }
}

function closeWindow() {
  if (editActiveValue.value) {
    if (startValue.value.text === val.value.text) {
      closeEditWindowAndReset();
    } else {
      saveChangesWithoutSavingConfirm.value = true;
    }
  }
  emit('close', RequireField.Text, startValue.value);
}

function closeEditWindowAndReset() {
  editActiveValue.value = false;
  val.value = startValue.value;
  emit('close', RequireField.Text, startValue.value);
}

function requireTextRowClosed(_, startValue) {
  editActiveValue.value = false;
  val.value = startValue;
}
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end">
      <q-btn dense flat icon="edit" size="xs" @click="setEditActive"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Edit</q-tooltip></q-btn
      >
      <q-btn dense flat icon="content_copy" size="xs"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Duplicate</q-tooltip></q-btn
      >
      <q-btn dense flat icon="delete" size="xs" @click="deleteConfirm = true"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Delete</q-tooltip></q-btn
      >
    </div>
    <div v-if="editActiveValue" class="dotted-border">
      <RequireTextRow v-model="val" editActive @close="requireTextRowClosed" />
    </div>
    <div v-else v-html="val.text" />
  </template>
  <template v-else>
    <div class="row items-center">
      <div class="col">
        <q-editor
          ref="editorRef"
          v-model="val.text"
          :toolbar="editorToolBarItems"
        />
      </div>
    </div>
    <ConfirmCancel
      v-if="editActive"
      confirmText="Save Changes"
      @confirm="saveChanges"
      @cancel="closeWindow"
    />
    <ConfirmCancel
      v-else
      confirmText="Add"
      @confirm="addPeComponent"
      @cancel="closeWindow"
    />
  </template>
  <q-dialog v-model="deleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to delete this row?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="primary"
          v-close-popup
          @click="deleteTextRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="saveChangesWithoutSavingConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Do you really want to close the document? Changes will be lost.</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Yes"
          color="primary"
          v-close-popup
          @click="closeEditWindowAndReset"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
