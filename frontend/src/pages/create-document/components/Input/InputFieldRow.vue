<script setup lang="ts">
import { ref, watch, reactive, computed, withDefaults } from 'vue';
import {
  InputFieldModel,
  InputTypes,
  getInputTypeIconForInputField,
  InputLength,
} from './RequireInputFieldRow.model';

const props = withDefaults(
  defineProps<{
    modelValue?: InputFieldModel | undefined;
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

const textInput = ref('');

watch(val.value.inputFieldAllowed, () => {
  let allFalse = (arr: boolean[]) => arr.every((v) => v === false);
  if (
    allFalse(
      Object.values(val.value.inputFieldAllowed).map((val) => {
        return val;
      })
    )
  ) {
    val.value.inputFieldAllowed.Text = true;
  }
});

const inputFieldNameFocused = ref(false);
function focusInputFieldName() {
  inputFieldNameFocused.value = true;
}
function unfocusInputFieldName() {
  inputFieldNameFocused.value = false;
}

const textRowClass = computed(() => {
  return val.value.inputLength === InputLength.big_input_field
    ? ['col-grow', 'text-center']
    : val.value.inputLength === InputLength.small_input_field
    ? ['col-xs-12 col-sm-6 q-mb-xs']
    : ['col-xs-12 col-sm-6 q-mb-xs'];
});

const descriptionRowClass = computed(() => {
  return val.value.inputLength === InputLength.big_input_field
    ? 'col-aut'
    : val.value.inputLength === InputLength.small_input_field
    ? ['col-xs-12', 'col-sm-6', 'text-center']
    : ['col-xs-12', 'col-sm-6', 'text-center'];
});

const previewPlaceHolder = computed(() => {
  if (props.preview) {
    switch (val.value.inputLength) {
      case InputLength.small_input_field:
        return 'maximum length of 26 characters';
      case InputLength.big_input_field:
        return 'maximum length of 64 characters';
      case InputLength.textarea:
        return 'autogrow input up to 2500 characters';
      default:
        return '';
    }
  } else return '';
});

const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const allowedHint = computed(() => {
  if (![InputTypes.mail, InputTypes.telephone].includes(val.value.inputType)) {
    let allowed = '';
    const and = 'and';
    if (val.value.inputFieldAllowed.Numbers) {
      allowed += 'numbers';
    }
    if (val.value.inputFieldAllowed.Text) {
      const alphabetical_letters = 'alphabetical letters';
      if (allowed) {
        allowed += ` ${and} ${alphabetical_letters}`;
      } else {
        allowed += alphabetical_letters;
      }
    }
    if (val.value.inputFieldAllowed.SpecialCharacters) {
      const special_characters = 'special characters';
      if (allowed) {
        allowed += ` ${and} ${special_characters}`;
      } else {
        allowed += special_characters;
      }
    }
    const hint = `Only ${allowed} allowed`;
    return val.value.inputFieldAllowed.Numbers &&
      val.value.inputFieldAllowed.Text &&
      val.value.inputFieldAllowed.SpecialCharacters
      ? ''
      : hint;
  } else {
    return '';
  }
});

const inputPrependShow = computed(() => {
  if (val.value.inputType === InputTypes.manual) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <div class="row justify-center">
    <div :class="descriptionRowClass">
      <p class="q-my-xs">
        <b>{{ val.name }}:</b>
      </p>
    </div>
    <div :class="textRowClass" :style="$q.screen.xs ? 'max-width: 270px;' : ''">
      <q-input
        v-model="textInput"
        outlined
        dense
        hide-hint
        :type="val.inputType"
        :maxlength="val.inputLength + 1"
        :rules="[
          (inputValue) =>
            inputValue.length <= val.inputLength ||
            `Please use maximum ${val.inputLength} characters`,
          (inputValue) =>
            val.inputFieldAllowed.Numbers ||
            (!val.inputFieldAllowed.Numbers && !/\d/.test(inputValue)) ||
            'Numbers are not allowed',
          (inputValue) =>
            val.inputFieldAllowed.SpecialCharacters ||
            (!val.inputFieldAllowed.SpecialCharacters &&
              !specialCharacters.test(inputValue)) ||
            'Special characters are not allowed',
          (inputValue) =>
            val.inputFieldAllowed.Text ||
            (!val.inputFieldAllowed.Text && !/^[a-zA-Z]+$/.test(inputValue)) ||
            'Alphabetical letters are not allowed',
        ]"
        :autogrow="val.inputLength === InputLength.textarea"
        :placeholder="preview ? previewPlaceHolder : ''"
        :hint="allowedHint"
        @focus="focusInputFieldName"
        @blur="unfocusInputFieldName"
      >
        <template v-if="inputPrependShow" #prepend>
          <q-icon :name="getInputTypeIconForInputField(val.inputType)" />
        </template>
      </q-input>
    </div>
  </div>
</template>
