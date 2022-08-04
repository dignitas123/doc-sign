<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Document Title",
  },
});
defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const inputFocused = ref(false);

function inputFocus() {
  inputFocused.value = true;
}

function inputUnfocus() {
  inputFocused.value = false;
}

const placeholderText = computed(() => {
  return inputFocused.value ? "" : props.placeholder;
});
</script>

<template>
  <div class="row">
    <div class="col" style="text-align: center">
      <q-input
        v-model="val"
        outlined
        dense
        autofocus
        input-class="text-center"
        :placeholder="placeholderText"
        @focus="inputFocus"
        @blur="inputUnfocus"
        maxlength="63"
      />
    </div>
  </div>
</template>
