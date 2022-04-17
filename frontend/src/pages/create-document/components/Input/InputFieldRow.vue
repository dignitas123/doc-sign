<script setup>
import { ref, watch, reactive, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  preview: {
    type: Boolean,
    default: false,
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
      textAreaSize: "small_input_field",
      maxLength: 64,
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

const textRowClass = computed(() => {
  return val.value.textAreaSize === "big_input_field"
    ? ["col-grow", "text-center"]
    : val.value.textAreaSize === "small_input_field"
    ? ["col-xs-12 col-sm-6"]
    : ["col-xs-12 col-sm-6"];
});

const descriptionRowClass = computed(() => {
  return val.value.textAreaSize === "big_input_field"
    ? "col-aut"
    : val.value.textAreaSize === "small_input_field"
    ? ["col-xs-12", "col-sm-6", "text-center"]
    : ["col-xs-12", "col-sm-6", "text-center"];
});

const placeHolder = computed(() => {
  if (props.preview) {
    return val.value.textAreaSize === "big_input_field"
      ? "63 characters allowed"
      : val.value.textAreaSize === "small_input_field"
      ? "26 characters allowed"
      : "Autogrow Textarea\n300 Characters allowed";
  } else return "";
});
</script>

<template>
  <div class="row items-baseline">
    <div :class="descriptionRowClass">
      <p class="mr-small">
        <b>{{ val.name }}:</b>
      </p>
    </div>
    <div :class="textRowClass">
      <q-input
        v-model="textInput"
        outlined
        dense
        :autogrow="val.textAreaSize === 'textarea'"
        :placeholder="placeHolder"
        :maxlength="
          val.textAreaSize === 'big_input_field'
            ? val.maxLength
            : val.textAreaSize === 'small_input_field'
            ? 26
            : 300
        "
        @focus="focusInputFieldName"
        @blur="unfocusInputFieldName"
      />
    </div>
  </div>
</template>
