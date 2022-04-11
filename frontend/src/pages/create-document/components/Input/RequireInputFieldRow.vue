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
    default: "Input Field Name",
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
    })
  );
}

const val = ref(getModelValue());

watch(val.value.inputFieldAllowed, () => {
  let allFalse = (arr) => arr.every((v) => v === false);
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
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end">
      <q-btn dense flat icon="edit" size="xs" />
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
          maxlength="63"
        />
      </div>
      <div class="col-xs-12 col-sm-6 text-center">
        <q-checkbox
          v-model="val.inputFieldAllowed.Text"
          label="A,b,c"
          color="primary"
        />
        <q-checkbox
          v-model="val.inputFieldAllowed.Numbers"
          label="0,1,2"
          color="primary"
        />
        <q-checkbox
          v-model="val.inputFieldAllowed.SpecialCharacters"
          label="*,$,%"
          color="primary"
        />
      </div>
    </div>
    <AddButton v-if="!preview" />
  </template>
</template>
