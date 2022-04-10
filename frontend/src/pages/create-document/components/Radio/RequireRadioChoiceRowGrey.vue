<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
const $q = useQuasar();

defineProps({
  modelValue: Object,
});

const emptyString = ref('')
const multipleChoice = ref("multiple_choice");
const atLeastOneChoice = ref(true);
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="emptyString"
        outlined
        dense
        disable
        placeholder="Radio Choice Title"
      />
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-btn-toggle
        v-model="multipleChoice"
        class="radio-choice-toggle ml-small"
        :class="{ 'mt-small': $q.screen.lt.sm }"
        no-caps
        rounded
        unelevated
        disable
        toggle-color="info"
        color="secondary"
        text-color="info"
        :options="[
          { label: 'Multiple Choice', value: 'multiple_choice' },
          { label: 'Single Choice', value: 'single_choice' },
        ]"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6 mt-small">
      <q-input v-model="emptyString" outlined disable placeholder="Choice Name" dense />
    </div>
    <div
      class="col mt-small text-center ml-small justify-center"
      style="display: inline-flex"
    >
      <q-btn
        unelevated
        outline
        color="info"
        label="Add Choice"
        icon="add"
        disabled
        style="margin-top: 1px"
      />
      <q-btn
        class="ml-small"
        unelevated
        outline
        color="info"
        icon="pmove"
        disabled
        style="margin-top: 1px"
      />
    </div>
  </div>
  <div class="row">
    <div class="col text-center">
      <q-checkbox
        class="grey-checkbox"
        v-model="atLeastOneChoice"
        label="At least one choice must be selected."
        color="info"
        disable
      />
    </div>
  </div>
  <AddButtonGrey />
</template>

<style lang="scss" scoped>
.grey-checkbox {
  color: var(--q-info);
}

.radio-choice-toggle {
  border: 1px solid var(--q-info);
}
</style>
