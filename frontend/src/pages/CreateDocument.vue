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
const inputFieldInput = reactive({
  name: "",
  inputFieldAllowed: reactive({
    Text: true,
    Numbers: false,
    SpecialCharacters: false,
  }),
});
const editorInput = ref("");
const radioChoiceInput = reactive({
  name: "",
  radioChoice: "multiple_choice",
  radioOneCheck: true,
  radioChoiceNames: reactive([]),
});
const fileRequireInput = reactive({
  name: "",
  allowAllEndings: false,
  allowedEndings: reactive([]),
});

function addButtonsRowClicked(type) {
  console.log(type, "button clicked");
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
      <div
        class="q-pa-md shadow-1 absolute"
        style="top: 20px; max-width: 552px"
      >
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
        >
          <DocumentHeader v-model="documentHeader" />
          <HyphenText>Add to Document</HyphenText>
          <AddButtonsRow
            :smallScreen="smallScreen"
            @buttonClicked="addButtonsRowClicked"
          />
          <FileRequireRow v-model="fileRequireInput" />
          <InputFieldRow v-model="inputFieldInput" />
          <EditorRow v-model="editorInput" />
          <RadioChoiceRow v-model="radioChoiceInput" />
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
</style>
