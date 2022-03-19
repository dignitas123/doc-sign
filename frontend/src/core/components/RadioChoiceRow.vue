<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const handleInput = () => emit("update:modelValue", val.value);

function addRadioChoice() {
  console.log("radio choice added clicked");
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="val.name"
        outlined
        placeholder="Radio Choice Title"
        @update="handleInput"
        :dense="true"
      />
      <!-- lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" -->
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-btn-toggle
        v-model="val.radioChoice"
        @update="handleInput"
        class="radio-choice-toggle ml-small"
        :class="{ 'mt-small': $q.screen.lt.sm }"
        no-caps
        rounded
        unelevated
        toggle-color="accent"
        color="secondary"
        text-color="accent"
        :options="[
          { label: 'Multiple Choice', value: 'multiple_choice' },
          { label: 'Single Choice', value: 'single_choice' },
        ]"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6 mt-small">
      <q-input
        v-model="val.radioChoiceNames"
        outlined
        placeholder="Choice Name"
        :dense="true"
      />
      <!-- lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" -->
    </div>
    <div class="col mt-small text-center ml-small">
      <q-btn
        unelevated
        outline
        color="accent"
        label="Add Choice"
        icon="add"
        style="margin-top: 1px"
        @click="addRadioChoice"
      />
    </div>
  </div>
  <HyphenText>{{ val.radioChoiceNames }}</HyphenText>
  <div class="row">
    <div class="col text-center">
      <q-checkbox
        v-model="val.radioOneCheck"
        label="At least one choice must be selected."
        color="primary"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-choice-toggle {
  border: 1px solid var(--q-accent);
}
</style>
