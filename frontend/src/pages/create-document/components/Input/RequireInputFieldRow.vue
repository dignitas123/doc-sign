<script setup>
import { ref, watch, reactive } from "vue";
import InputFieldRow from "./InputFieldRow.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  preview: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Input Label (Name, Address, ...)",
  },
});
defineEmits(["update:modelValue"]);

function getModelValue() {
  return (
    props.modelValue ??
    reactive({
      name: "",
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

const allFalse = (arr) => arr.every((v) => v === false);

watch(val.value.inputFieldAllowed, () => {
  if (
    allFalse(
      Object.values(val.value.inputFieldAllowed).map((val) => val)
    )
  ) {
    val.value.inputFieldAllowed.Text = true;
  }
});

watch(() => val.value.textAreaSize, (textAreaSize) => {
  if(textAreaSize === 'small_input_field' || textAreaSize === 'textarea') {
    const currentName = val.value.name;
    if(currentName.length > 26) {
      val.value.name = currentName.slice(0, val.value.name.length - 26);
    }
  }
});

const inputFieldNameFocused = ref(false);
function focusInputFieldName() {
  inputFieldNameFocused.value = true;
}
function unfocusInputFieldName() {
  inputFieldNameFocused.value = false;
}
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end">
      <q-btn dense flat icon="edit" size="xs" />
      <q-btn dense flat icon="content_copy" size="xs" />
      <q-btn dense flat icon="delete" size="xs" />
    </div>
    <InputFieldRow v-if="preview" v-model="val" />
  </template>
  <template v-else>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <q-input
          v-model="val.name"
          outlined
          dense
          :placeholder="inputFieldNameFocused ? '' : placeholder"
          @focus="focusInputFieldName"
          @blur="unfocusInputFieldName"
          :maxlength="val.textAreaSize === 'big_input_field' ? val.maxLength : val.textAreaSize === 'small_input_field' ? 26 : 26"
        />
      </div>
      <div class="col-xs-12 col-sm-6 text-center">
        <q-checkbox
          v-model="val.inputFieldAllowed.Text"
          label="A,b,c"
          color="primary"
        ><q-tooltip :delay="750" :offset="[0, 10]">Allow alphabetical letters.</q-tooltip></q-checkbox>
        <q-checkbox
          v-model="val.inputFieldAllowed.Numbers"
          label="0,1,2"
          color="primary"
        ><q-tooltip :delay="750" :offset="[0, 10]">Allow numbers.</q-tooltip></q-checkbox>
        <q-checkbox
          v-model="val.inputFieldAllowed.SpecialCharacters"
          label="*,$,%"
          color="primary"
        ><q-tooltip :delay="750" :offset="[0, 10]">Allow special characters.</q-tooltip></q-checkbox>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 text-center">
        <q-radio v-model="val.textAreaSize" val="small_input_field" label="Small Input Field" />
        <q-radio v-model="val.textAreaSize" val="big_input_field" label="Big Input Field" />
        <q-radio v-model="val.textAreaSize" val="textarea" label="Textarea" />
      </div>
    </div>
    <template v-if="val.name">
    <HyphenText class="mt-small mb-big">Preview</HyphenText>
      <InputFieldRow v-model="val" preview />
    </template>
    <AddButton v-if="!preview" />
  </template>
</template>
