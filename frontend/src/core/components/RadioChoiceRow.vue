<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);
const choiceName = ref("");

const CHECKBOX_DSIABLED_VALUE = ref([]);

const handleInput = () => emit("update:modelValue", val.value);

function addRadioChoice() {
  if (choiceName.value) {
    val.value.radioChoiceNames.push(choiceName.value);
    CHECKBOX_DSIABLED_VALUE.value.push(false);
    choiceName.value = "";
    handleInput();
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
  CHECKBOX_DSIABLED_VALUE.value.pop();
  handleInput();
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
        @keydown.enter.prevent="$refs.choiceNameInput.$el.focus()"
      />
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
        ref="choiceNameInput"
        v-model="choiceName"
        outlined
        :disable="val.name ? false : true"
        placeholder="Choice Name"
        :dense="true"
        @keydown.enter.prevent="addRadioChoice"
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
    <!-- <div class="col mt-small text-center ml-small">
        
    </div> -->
  </div>
  <template v-if="val.name">
    <HyphenText>{{ val.name }}</HyphenText>
    <div v-if="val.radioChoiceNames.length" class="row">
      <div v-for="(name, i) in val.radioChoiceNames" :key="i">
        <q-checkbox
          v-model="CHECKBOX_DSIABLED_VALUE[i]"
          color="primary"
          :label="name"
        />
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
  <AddButton />
</template>

<style lang="scss" scoped>
.radio-choice-toggle {
  border: 1px solid var(--q-accent);
}
</style>
