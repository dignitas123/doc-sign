<script setup>
import { ref, computed, reactive, watch, inject, onMounted } from "vue";
import RequireTextRow from "./RequireTextRow.vue";
import { useQuasar } from "quasar";
import { RequireField } from "../../Index.model";
import SaveChangesButton from "../../../../core/components/SaveChangesButton.vue";

const $q = useQuasar();

const emitter = inject("emitter");

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

defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);
const startValue = ref();

onMounted(() => {
  startValue.value = { ...val.value };
});

const toolbarTextDesktopItems = ref([
  ["link"],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
  ],
  ["unordered", "ordered", "outdent", "indent"],
]);

const editorToolBarItems = computed(() => {
  return reactive([
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: "only-icons",
        options: ["left", "center", "right", "justify"],
      },
    ],
    ["bold", "italic", "underline"],
    ...($q.screen.lt.sm ? [] : toolbarTextDesktopItems.value),
  ]);
});

const validated = computed(() => {
  return !!val.value.text.length;
});

const validationMessage = computed(() => {
  return validated.value ? "" : "Text Field can't be empty.";
});

const editActiveValue = ref(props.editActive);

function setEditActive() {
  editActiveValue.value = true;
}

function deleteTextRow() {
  emitter.emit("peComponentDeleted", {
    type: RequireField.Text,
    name: val.value.text,
  });
}

const deleteConfirm = ref(false);

emitter.on("editComponentChanged", (data) => {
  if (data.validated) {
    editActiveValue.value = false;
  }
});

emitter.on("editComponentClosed", () => {
  if (editActiveValue.value) {
    editActiveValue.value = false;
    val.value = startValue.value;
  }
});
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end">
      <q-btn dense flat icon="edit" size="xs" @click="setEditActive" />
      <q-btn dense flat icon="content_copy" size="xs" />
      <q-btn dense flat icon="delete" size="xs" @click="deleteConfirm = true" />
    </div>
    <div v-if="editActiveValue" class="dotted-border">
      <RequireTextRow v-model="val" editActive />
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
    <SaveChangesButton
      v-if="editActive"
      :validated="validated"
      :message="validationMessage"
    />
    <AddButton v-else :validated="validated" :message="validationMessage" />
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
</template>
