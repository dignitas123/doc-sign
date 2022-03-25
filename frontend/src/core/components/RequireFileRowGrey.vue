<script setup>
import { ref } from "vue";

defineProps({
  modelValue: Object,
});

const emptyString = ref("");
const allowAllFileEndings = ref(false);
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="emptyString"
        outlined
        disable
        placeholder="File Description"
        dense
      />
    </div>
    <div
      class="col text-center ml-small justify-center"
      style="display: inline-flex"
    >
      <q-input
        ref="endingNameInput"
        v-model="emptyString"
        outlined
        dense
        disable
        placeholder="(.png, .pdf, ...)"
      />
      <q-btn
        class="ml-small"
        unelevated
        outline
        color="info"
        disable
        icon="add"
        style="margin-top: 1px"
      />
    </div>
  </div>
  <div class="row">
    <div class="col text-center">
      <q-checkbox
        class="grey-checkbox"
        v-model="allowAllFileEndings"
        label="Allow all file endings"
        disable
        color="info"
      />
    </div>
  </div>
  <AddButtonGrey />
</template>

<style scoped>
.grey-checkbox {
  color: var(--q-info);
}
</style>
