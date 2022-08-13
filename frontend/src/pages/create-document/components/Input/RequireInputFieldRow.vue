<script setup>
import { ref, watch, reactive, computed, onMounted } from 'vue';
import InputFieldRow from './InputFieldRow.vue';
import RequireInputFieldRow from './RequireInputFieldRow.vue';
import { RequireField } from '../../create-document.model';
import ConfirmCancel from 'src/core/components/confirm-cancel.vue';
import HyphenText from 'src/core/components/hyphen-text.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  preview: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Input Label',
  },
  placeholder: {
    type: String,
    default: '(Name, Address, ...)',
  },
  editActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'add',
  'delete',
  'change',
  'close',
  'duplicate',
]);

const nameInputRef = ref(null);

onMounted(() => {
  if (nameInputRef.value) {
    nameInputRef.value.focus();
  }
  startValue.value = { ...val.value };
  editActiveValue.value = props.editActive;
});

function getModelValue() {
  return (
    props.modelValue ??
    reactive({
      name: '',
      inputFieldAllowed: reactive({
        Text: true,
        Numbers: false,
        SpecialCharacters: false,
      }),
      textAreaSize: 'small_input_field',
      maxLength: 64,
    })
  );
}

const val = ref(getModelValue());
const startValue = ref();

const allFalse = (arr) => arr.every((v) => v === false);

watch(val.value.inputFieldAllowed, () => {
  if (allFalse(Object.values(val.value.inputFieldAllowed).map((val) => val))) {
    val.value.inputFieldAllowed.Text = true;
  }
});

watch(
  () => val.value.textAreaSize,
  (textAreaSize) => {
    if (textAreaSize === 'small_input_field' || textAreaSize === 'textarea') {
      const currentName = val.value.name;
      if (currentName.length > 26) {
        val.value.name = currentName.slice(0, val.value.name.length - 26);
      }
    }
  }
);

const inputFieldNameFocused = ref(false);
function focusInputFieldName() {
  inputFieldNameFocused.value = true;
}
function unfocusInputFieldName() {
  inputFieldNameFocused.value = false;
}

const validated = computed(() => {
  return !!val.value.name.length;
});

const validationMessage = computed(() => {
  return validated.value ? '' : "Name of Input Field can't be empty.";
});

const editActiveValue = ref(false);

function setEditActive() {
  editActiveValue.value = true;
}

function saveChanges() {
  if (validated.value) {
    editActiveValue.value = false;
    emit('close', RequireField.Input, val.value);
  }
}

function closeWindow() {
  if (editActiveValue.value) {
    val.value = startValue.value;
    editActiveValue.value = false;
  }
  emit('close', RequireField.Input, startValue.value);
}

function addPeComponent() {
  emit('add', RequireField.Input, {
    validated: validated.value,
    message: validationMessage.value,
  });
}

function deleteInputFieldRow() {
  emit('delete', {
    type: RequireField.Input,
    name: val.value.name,
  });
}

function requireInputFieldRowClosed(_, startValue) {
  editActiveValue.value = false;
  val.value = startValue;
}

function duplicateRow() {
  emit('duplicate', RequireField.Input, val.value);
}

const deleteConfirm = ref(false);
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end items-center">
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
      <RequireInputFieldRow
        v-model="val"
        @close="requireInputFieldRowClosed"
        editActive
      />
    </div>
    <InputFieldRow v-else v-model="val" />
  </template>
  <template v-else>
    <div class="row items-center">
      <div class="col-xs-12 col-sm-6">
        <q-input
          ref="nameInputRef"
          v-model="val.name"
          outlined
          :label="label"
          :placeholder="placeholder"
          @focus="focusInputFieldName"
          @blur="unfocusInputFieldName"
          @keyup.enter="addPeComponent"
          :maxlength="
            val.textAreaSize === 'big_input_field'
              ? val.maxLength
              : val.textAreaSize === 'small_input_field'
              ? 26
              : 26
          "
        />
      </div>
      <div class="col-xs-12 col-sm-6 text-center">
        <q-checkbox
          v-model="val.inputFieldAllowed.Text"
          label="A,b,c"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow alphabetical letters.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.Numbers"
          label="0,1,2"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow numbers.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.SpecialCharacters"
          label="*,$,%"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow special characters.</q-tooltip
          ></q-checkbox
        >
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 text-center">
        <q-radio
          v-model="val.textAreaSize"
          val="small_input_field"
          label="Small Input Field"
        />
        <q-radio
          v-model="val.textAreaSize"
          val="big_input_field"
          label="Big Input Field"
        />
        <q-radio v-model="val.textAreaSize" val="textarea" label="Textarea" />
      </div>
    </div>
    <template v-if="val.name">
      <HyphenText class="mt-small mb-big">Preview</HyphenText>
      <InputFieldRow v-model="val" preview />
    </template>
    <ConfirmCancel
      v-if="editActiveValue"
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
