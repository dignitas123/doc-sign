<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  }
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

const textInput = ref("");

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
  <div class="row" style="align-items: baseline;">
    <div class="col-auto">
      <p class="mr-small"><b>{{val.name}}:</b></p>
    </div>
    <div class="col-grow text-center">
      <q-input
        v-model="textInput"
        outlined
        dense
        @focus="focusInputFieldName"
        @blur="unfocusInputFieldName"
        maxlength="63"
      />
    </div>
  </div>
</template>
