<script setup lang="ts">
import { ref, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
  }>(),
  {
    modelValue: '',
    label: 'Document Title',
  }
);

defineEmits<{
  (event: 'update:modelValue'): void;
}>();

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
    <div class="col q-mt-xs q-mb-md q-mx-md">
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
