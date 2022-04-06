<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, inject } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
import RequireInputFieldRow from "src/core/components/RequireInputFieldRow.vue";
import RequireEditorRow from "src/core/components/RequireEditorRow.vue";
import RequireRadioChoiceRow from "src/core/components/RequireRadioChoiceRow.vue";
import RequireFileRow from "src/core/components/RequireFileRow.vue";
import RequireInputFieldRowGrey from "src/core/components/RequireInputFieldRowGrey.vue";
import RequireEditorRowGrey from "src/core/components/RequireEditorRowGrey.vue";
import RequireFileRowGrey from "src/core/components/RequireFileRowGrey.vue";
import RequireRadioChoiceRowGrey from "src/core/components/RequireRadioChoiceRowGrey.vue";

const requireInputFieldRowGrey = Object.freeze(RequireInputFieldRowGrey);
const requireEditorRowGrey = Object.freeze(RequireEditorRowGrey);
const requireFileRowGrey = Object.freeze(RequireFileRowGrey);
const requireRadioChoiceRowGrey = Object.freeze(RequireRadioChoiceRowGrey);

const requireInputFieldRow = Object.freeze(RequireInputFieldRow);
const requireEditorRow = Object.freeze(RequireEditorRow);
const requireRadioChoiceRow = Object.freeze(RequireRadioChoiceRow);
const requireFileRow = Object.freeze(RequireFileRow);

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
function resetInputFieldInput() {
  inputFieldInput.name = "";
  inputFieldInput.inputFieldAllowed = reactive({
    Text: true,
    Numbers: false,
    SpecialCharacters: false,
  });
}

const editorInput = reactive({
  text: ""
});
function resetEditorInput() {
  editorInput.text = "";
}

const radioChoiceInput = reactive({
  name: "",
  radioChoice: "multiple_choice",
  radioOneCheck: true,
  radioChoiceNames: reactive([]),
});
function resetRadioChoiceInput() {
  radioChoiceInput.name = "";
  radioChoiceInput.radioChoice = "multiple_choice";
  radioChoiceInput.radioOneCheck = true;
  radioChoiceInput.radioChoiceNames = reactive([]);
}

const fileRequireInput = reactive({
  name: "",
  allowAllEndings: false,
  allowedEndings: reactive([]),
});
function resetFileRequireInput() {
  fileRequireInput.name = "";
  fileRequireInput.allowAllEndings = false;
  fileRequireInput.allowedEndings = reactive([]);
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

// active preview and edit component
const activePeComponent = reactive({
  component: undefined,
  vModel: {},
  name: "",
});

const requireField = {
  Input: "Input",
  Text: "Text",
  Radio: "Radio",
  File: "File",
};

function addButtonsRowClicked(buttonType) {
  if (buttonType === requireField.Input) {
    activePeComponent.component = requireInputFieldRow;
    activePeComponent.vModel = inputFieldInput;
    activePeComponent.name = requireField.Input;
  } else if (buttonType === requireField.Text) {
    activePeComponent.component = requireEditorRow;
    activePeComponent.vModel = editorInput;
    activePeComponent.name = requireField.Text;
  } else if (buttonType === requireField.Radio) {
    activePeComponent.component = requireRadioChoiceRow;
    activePeComponent.vModel = radioChoiceInput;
    activePeComponent.name = requireField.Radio;
  } else if (buttonType === requireField.File) {
    activePeComponent.component = requireFileRow;
    activePeComponent.vModel = fileRequireInput;
    activePeComponent.name = requireField.File;
  }
}

function addButtonsRowHover(buttonType) {
  if(Object.keys(activePeComponent.vModel).length === 0) {
    if (buttonType.input) {
      activePeComponent.component = requireInputFieldRowGrey;
    } else if (buttonType.text) {
      activePeComponent.component = requireEditorRowGrey;
    } else if (buttonType.radio) {
      activePeComponent.component = requireRadioChoiceRowGrey;
    } else if (buttonType.file) {
      activePeComponent.component = requireFileRowGrey;
    } else {
      resetActivePeComponent();
    }
  }
}

function resetActivePeComponent() {
  if(activePeComponent.name === requireField.Input) {
    resetInputFieldInput();
  } else if(activePeComponent.name === requireField.Text) {
    resetEditorInput();
  } else if(activePeComponent.name === requireField.Radio) {
    resetRadioChoiceInput();
  } else if(activePeComponent.name === requireField.File) {
    resetFileRequireInput();
  }
  activePeComponent.component = undefined;
  activePeComponent.vModel = {};
  activePeComponent.name = "";
}

const emitter = inject('emitter');
emitter.on("peComponentClosed", () => {
  resetActivePeComponent();
});
</script>

<template>
  <main-layout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute create-document">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
          spellcheck="false"
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
  background: var(--q-secondary);
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
