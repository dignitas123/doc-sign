<script setup>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";

const $q = useQuasar();

const props = defineProps({
  modelValue: Object,
});

defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);
const choiceName = ref("");

const checkBoxValues = ref([]);
watch(
  () => [...checkBoxValues.value],
  (newValues, oldValues) => {
    if (val.value.radioChoice === "single_choice") {
      const checkedValues = newValues.filter((el) => el === true).length;
      if (checkedValues > 1) {
        // find out which value changed
        const newValueIndex = newValues.findIndex(
          (el, index) => el !== oldValues[index]
        );
        checkBoxValues.value = checkBoxValues.value.map((el, index) =>
          index === newValueIndex ? el : false
        );
      }
    }
  }
);

function addRadioChoice() {
  if (choiceName.value) {
    val.value.radioChoiceNames.push(choiceName.value);
    checkBoxValues.value.push(false);
    choiceName.value = "";
  } else {
    $q.notify({
      type: "info",
      message: "You cannot add an empty Choice.",
      timeout: 500,
    });
  }
}

function removeRadioChoice() {
  val.value.radioChoiceNames.pop();
  checkBoxValues.value.pop();
}

const radioChoiceTitleFocused = ref(false);
function focusRadioChoiceTitle() {
  radioChoiceTitleFocused.value = true;
}
function unfocusRadioChoiceTitle() {
  radioChoiceTitleFocused.value = false;
}

const choiceNameFocused = ref(false);
function focusChoiceName() {
  choiceNameFocused.value = true;
}
function unfocusChoiceName() {
  choiceNameFocused.value = false;
}

const currentChoice = ref(val.value.radioChoice); // `multiple_choice` or `single_choice`
watch(val.value, () => {
  const newChoice = val.value.radioChoice;
  if (
    currentChoice.value === "multiple_choice" &&
    newChoice === "single_choice"
  )
    checkBoxValues.value = checkBoxValues.value.map((_) => false);
  if (currentChoice.value !== val.value.radioChoice)
    currentChoice.value = val.value.radioChoice;
});
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="val.name"
        outlined
        dense
        :placeholder="radioChoiceTitleFocused ? '' : 'Radio Choice Title'"
        @focus="focusRadioChoiceTitle"
        @blur="unfocusRadioChoiceTitle"
        @keydown.enter.prevent="$refs.choiceNameInput.$el.focus()"
        maxlength="63"
      />
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-btn-toggle
        v-model="val.radioChoice"
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
        ref="choiceNameInput"
        v-model="choiceName"
        outlined
        dense
        :disable="val.name ? false : true"
        :placeholder="choiceNameFocused ? '' : 'Choice Name'"
        @focus="focusChoiceName"
        @blur="unfocusChoiceName"
        @keydown.enter.prevent="addRadioChoice"
        maxlength="63"
      />
    </div>
    <div
      class="col mt-small text-center ml-small justify-center"
      style="display: inline-flex"
    >
      <q-btn
        unelevated
        outline
        color="accent"
        label="Add Choice"
        icon="add"
        :disabled="val.name ? false : true"
        style="margin-top: 1px"
        @click="
          addRadioChoice();
          $refs.choiceNameInput.$el.focus();
        "
      />
      <q-btn
        class="ml-small"
        unelevated
        outline
        :color="val.radioChoiceNames.length ? 'primary' : 'info'"
        icon="remove"
        :disabled="val.radioChoiceNames.length ? false : true"
        style="margin-top: 1px"
        @click="
          removeRadioChoice();
          $refs.choiceNameInput.$el.focus();
        "
      />
    </div>
  </div>
  <template v-if="val.name">
    <HyphenText class="mt-medium mb-medium">{{ val.name }}</HyphenText>
    <div v-if="val.radioChoiceNames.length" class="row">
      <div v-for="(name, i) in val.radioChoiceNames" :key="i">
        <q-checkbox v-model="checkBoxValues[i]" color="primary" :label="name" />
      </div>
    </div>
  </template>
  <div class="row">
    <div class="col text-center">
      <q-checkbox
        v-model="val.radioOneCheck"
        label="At least one choice must be selected."
        color="primary"
      />
    </div>
  </div>
  <ConfirmCancelButton confirmText="Add" />
</template>

<style lang="scss" scoped>
.radio-choice-toggle {
  border: 1px solid var(--q-accent);
}
</style>
