<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
  placeholder: {
    type: String,
    default: "Input Field Name",
  },
});
defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

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
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="val.name"
        outlined
        dense
        :placeholder="inputFieldNameFocused ? '' : placeholder"
        @focus="focusInputFieldName"
        @blur="unfocusInputFieldName"
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
  <AddButton />
</template>
