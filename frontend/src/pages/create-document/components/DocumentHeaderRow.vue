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
  <div class="row">
    <div class="col mb-big" style="text-align: center; font-weight: bold">
      <q-input
        v-model="val"
        input-class="--header-row"
        :label="label"
        @focus="inputFocus"
        @blur="inputUnfocus"
        maxlength="63"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--header-row {
  font-weight: bold !important;
}
</style>
