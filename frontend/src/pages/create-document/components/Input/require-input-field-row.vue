<script setup lang="ts">
import { ref, watch, withDefaults, reactive, computed, onMounted } from 'vue';
import InputFieldRow from './input-field-row.vue';
import { RequireField } from '../../create-document.model';
import ConfirmCancel from 'src/core/components/confirm-cancel.vue';
import HyphenText from 'src/core/components/hyphen-text.vue';
import {
  InputFieldModel,
  InputLength,
  InputTypes,
  getInputTypeIcon,
} from './require-input-field-row.model';

const props = withDefaults(
  defineProps<{
    modelValue?: InputFieldModel | undefined;
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

const nameInputRef = ref<HTMLElement | null>(null);

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
      inputLength: InputLength.small_input_field,
      inputType: InputTypes.manual,
    })
  );
}

const val = ref(getModelValue());
const startValue = ref();

const allFalse = (arr: boolean[]) => arr.every((v) => v === false);

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

const validationMessages = computed(() => {
  return validated.value ? [''] : ["Name of Input Field can't be empty."];
});

const clickActiveIndexKey = ref(0);

const editActiveValue = ref(false);

function setEditActive() {
  editActiveValue.value = true;
}

function saveChanges() {
  if (validated.value) {
    editActiveValue.value = false;
    emit('close', { type: RequireField.Input, value: val.value });
  }
}

function closeWindow() {
  if (editActiveValue.value) {
    val.value = startValue.value;
    editActiveValue.value = false;
  }
  emit('close', { type: RequireField.Input, value: startValue.value });
}

function addPreviewComponent() {
  emit('add', RequireField.Input, {
    validated: validated.value,
    messages: validationMessages.value,
  });
}

function deleteInputFieldRow() {
  emit('delete', {
    type: RequireField.Input,
    name: val.value.name,
  });
}

function requireInputFieldRowClosed(data: {
  type: RequireField;
  value: InputFieldModel;
}) {
  editActiveValue.value = false;
  val.value = data.value;
}

function duplicateRow() {
  emit('duplicate', RequireField.Input, val.value);
}

function setActiveSelectedInputType(inputType: InputTypes) {
  clickActiveIndexKey.value++;
  val.value.inputType = inputType;
}

const inputLengthAndInputRadioShow = computed(() => {
  if (val.value.inputType === InputTypes.manual) {
    return true;
  } else {
    return false;
  }
});

const deleteConfirm = ref(false);

watch(
  clickActiveIndexKey,
  () => {
    if (val.value.inputType === InputTypes.mail) {
      val.value.name = 'Email';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.email;
    } else if (val.value.inputType === InputTypes.telephone) {
      val.value.name = 'Telephone';
      val.value.inputFieldAllowed.Text = false;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.email;
    } else if (val.value.inputType === InputTypes.manual) {
      val.value.name = '';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = false;
      val.value.inputFieldAllowed.SpecialCharacters = false;
      val.value.inputLength = InputLength.small_input_field;
    } else if (val.value.inputType === InputTypes.link) {
      val.value.name = 'URL';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.url_input;
    } else if (val.value.inputType === InputTypes.password) {
      val.value.name = 'Password';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.default;
    } else if (val.value.inputType === InputTypes.date) {
      val.value.name = 'Date';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.default;
    } else if (val.value.inputType === InputTypes.time) {
      val.value.name = 'Time';
      val.value.inputFieldAllowed.Text = true;
      val.value.inputFieldAllowed.Numbers = true;
      val.value.inputFieldAllowed.SpecialCharacters = true;
      val.value.inputLength = InputLength.default;
    }
  },
  {
    deep: true,
  }
);

watch(val.value.inputFieldAllowed, () => {
  if (allFalse(Object.values(val.value.inputFieldAllowed).map((val) => val))) {
    val.value.inputFieldAllowed.Text = true;
  }
});

watch(
  () => val.value.inputLength,
  (inputLength) => {
    if (
      inputLength === InputLength.small_input_field ||
      inputLength === InputLength.textarea
    ) {
      const currentName = val.value.name;
      if (currentName.length > 26) {
        val.value.name = currentName.slice(0, val.value.name.length - 26);
      }
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
      <RequireInputFieldRow
        v-model="val"
        @close="requireInputFieldRowClosed"
        editActive
      />
    </div>
    <InputFieldRow v-else v-model="val" />
  </template>
  <template v-else>
    <template v-if="val.name">
      <HyphenText class="q-mt-xs q-mb-md">Preview</HyphenText>
      <InputFieldRow v-model="val" preview />
      <div
        v-if="val.name && inputLengthAndInputRadioShow"
        class="row justify-center"
      >
        <div class="col-xs-12 col-sm-10 text-center">
          <q-radio
            v-model="val.inputLength"
            :val="InputLength.small_input_field"
            label="Small Input Field"
          />
          <q-radio
            v-model="val.inputLength"
            :val="InputLength.big_input_field"
            label="Big Input Field"
          />
          <q-radio
            v-model="val.inputLength"
            :val="InputLength.textarea"
            label="Autogrow"
          />
        </div>
      </div>
    </template>
    <div class="row items-center text-center">
      <div class="col-xs-12 col-sm-6">
        <q-input
          ref="nameInputRef"
          v-model="val.name"
          outlined
          :label="label"
          :placeholder="placeholder"
          @focus="focusInputFieldName"
          @blur="unfocusInputFieldName"
          @keyup.enter="addPreviewComponent"
          :maxlength="val.inputLength"
        />
      </div>
      <div
        v-if="inputLengthAndInputRadioShow"
        class="col-xs-12 col-sm-6 text-center"
      >
        <q-checkbox
          v-model="val.inputFieldAllowed.Text"
          label="Abc"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow alphabetical letters.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.Numbers"
          label="012"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow numbers.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.SpecialCharacters"
          label=".,$%"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow special characters.</q-tooltip
          ></q-checkbox
        >
      </div>
    </div>
    <div class="col q-my-sm">
      <q-btn-group unelevated spread>
        <q-btn
          :outline="val.inputType !== InputTypes.manual"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.manual)"
          @click="setActiveSelectedInputType(InputTypes.manual)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.mail"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.mail)"
          @click="setActiveSelectedInputType(InputTypes.mail)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.telephone"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.telephone)"
          @click="setActiveSelectedInputType(InputTypes.telephone)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.link"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.link)"
          @click="setActiveSelectedInputType(InputTypes.link)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.password"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.password)"
          @click="setActiveSelectedInputType(InputTypes.password)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.date"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.date)"
          @click="setActiveSelectedInputType(InputTypes.date)"
        />
        <q-btn
          :outline="val.inputType !== InputTypes.time"
          color="accent"
          :icon-right="getInputTypeIcon(InputTypes.time)"
          @click="setActiveSelectedInputType(InputTypes.time)"
        />
      </q-btn-group>
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
