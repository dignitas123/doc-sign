<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Document Title',
  },
});
defineEmits(['update:modelValue']);

const val = ref(props.modelValue);

const inputFocused = ref(false);

function inputFocus() {
  inputFocused.value = true;
}

function inputUnfocus() {
  inputFocused.value = false;
}
</script>

<template>
  <div class="row document-header-row">
    <div class="col mb-big">
      <q-input
        v-model="val"
        outined
        dense
        :label="label"
        @focus="inputFocus"
        @blur="inputUnfocus"
        maxlength="63"
      />
    </div>
  </div>
</template>

<style lang="scss">
.document-header-row {
  .q-field__native {
    font-weight: bold !important;
  }
}
</style>
