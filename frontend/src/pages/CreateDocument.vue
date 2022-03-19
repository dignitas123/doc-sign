<script setup>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";

const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size) {
  if (size.width < 461) {
    smallScreen.value = true;
  } else smallScreen.value = false;
}

// -- Form Variables --
const documentHeader = ref("");
const inputName = ref();
const inputFieldInput = reactive({
  name: '',
  inputFieldAllowed: reactive({
    Text: true,
    Numbers: false,
    SpecialCharacters: false,
  })
});
const editorContent = ref("");
const radioChoice = ref("multiple_choice");
const radioOneCheck = ref(false);
const radioChoiceTitle = ref("");

function addButtonsRowClicked(type) {
  console.log(type, 'button clicked');
}

const accept = ref(false);
function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  accept.value = false;
}
</script>

<template>
  <main-layout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute" style="top: 20px">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
        >
          <DocumentHeader v-model="documentHeader" />
          <HyphenText>Add to Document</HyphenText>
          <AddButtonsRow :smallScreen="smallScreen" @buttonClicked="addButtonsRowClicked" />
          <InputFieldRow v-model="inputFieldInput" />
          <EditorRow v-model="editorContent" />
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="radioChoiceTitle"
                outlined
                placeholder="Radio Choice Title"
                :dense="true"
              />
              <!-- lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" -->
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
              <q-btn-toggle
                v-model="radioChoice"
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
                v-model="inputName"
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
              />
            </div>
          </div>
          <div class="row">
            <HyphenText>{{ radioChoiceTitle }}</HyphenText>
          </div>
          <div class="row">
            <div class="col text-center">
              <q-checkbox
                v-model="radioOneCheck"
                label="At least one choice must be selected."
                color="primary"
              />
            </div>
          </div>
        </q-form>
        <q-resize-observer :debounce="0" @resize="onResize" />
      </div>
    </q-page>
    <template #secondToolbar>
      <div class="second-toolbar">
        <q-breadcrumbs>
          <q-breadcrumbs-el
            class="breadcumb-element"
            label="Documents"
            icon="description"
            to="/documents"
          />
        </q-breadcrumbs>
        <div class="text-h6" style="text-align: center; width: 100%">
          Create a Signable Ethereum Document
        </div>
      </div>
    </template>
  </main-layout>
</template>

<style lang="scss" scoped>
.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.q-field--highlighted {
  color: transparent !important;
}

.radio-choice-toggle {
  border: 1px solid var(--q-accent);
}
</style>
