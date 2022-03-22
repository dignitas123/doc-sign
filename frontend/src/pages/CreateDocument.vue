<script setup>
import { useQuasar } from "quasar";
import { ref, computed, reactive, shallowRef } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
// import RequireFileRow from "src/core/components/RequireFileRow.vue";
// import RequireInputFieldRow from "src/core/components/RequireInputFieldRow.vue";
// import RequireEditorRow from "src/core/components/RequireEditorRow.vue";
// import RequireRadioChoiceRow from "src/core/components/RequireRadioChoiceRow.vue";
import RequireInputFieldRowGrey from "src/core/components/RequireInputFieldRowGrey.vue";
import RequireEditorRowGrey from "src/core/components/RequireEditorRowGrey.vue";
import RequireFileRowGrey from "src/core/components/RequireFileRowGrey.vue";
import RequireRadioChoiceRowGrey from "src/core/components/RequireRadioChoiceRowGrey.vue";

const requireInputFieldRowGrey = Object.freeze(RequireInputFieldRowGrey);
const requireEditorRowGrey = Object.freeze(RequireEditorRowGrey);
const requireFileRowGrey = Object.freeze(RequireFileRowGrey);
const requireRadioChoiceRowGrey = Object.freeze(RequireRadioChoiceRowGrey);
const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size) {
  if (size.width < 461) {
    smallScreen.value = true;
  } else smallScreen.value = false;
}

// -- Form Variables --
const documentHeader = ref("");
// const inputFieldInput = reactive({
//   name: "",
//   inputFieldAllowed: reactive({
//     Text: true,
//     Numbers: false,
//     SpecialCharacters: false,
//   }),
// });
// const editorInput = ref("");
// const radioChoiceInput = reactive({
//   name: "",
//   radioChoice: "multiple_choice",
//   radioOneCheck: true,
//   radioChoiceNames: reactive([]),
// });
// const fileRequireInput = reactive({
//   name: "",
//   allowAllEndings: false,
//   allowedEndings: reactive([]),
// });

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

// active preview and edit component
const activePeComponent = reactive({
  component: undefined,
  vModel: "",
});

function addButtonsRowClicked() {
  console.log("Add Buttons Row clicked.");
}

function addButtonsRowHover(buttonType) {
  if (buttonType.input) {
    activePeComponent.component = requireInputFieldRowGrey;
  } else if (buttonType.text) {
    activePeComponent.component = requireEditorRowGrey;
  } else if (buttonType.radio) {
    activePeComponent.component = requireRadioChoiceRowGrey;
  } else if (buttonType.file) {
    activePeComponent.component = requireFileRowGrey;
  } else {
    activePeComponent.component = undefined;
  }
}
</script>

<template>
  <main-layout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute create-document">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
        >
          <DocumentHeaderRow v-model="documentHeader" />
          <HyphenText>Add to Document</HyphenText>
          <AddButtonsRow
            :smallScreen="smallScreen"
            @buttonClicked="addButtonsRowClicked"
            @mouseHover="addButtonsRowHover"
          />
          <component
            :is="activePeComponent.component"
            v-model="activePeComponent.vModel"
          />
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
.create-document {
  top: 20px;
  max-width: 552px;
  min-height: 92%;
}
.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.q-field--highlighted {
  color: transparent !important;
}
</style>
