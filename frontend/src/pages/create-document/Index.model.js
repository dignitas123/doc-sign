import { reactive, ref } from "vue";
import InputFieldRow from "./components/Input/RequireInputFieldRow.vue";
import RequireInputFieldRow from "./components/Input/RequireInputFieldRow.vue";
import RequireInputFieldRowGrey from "./components/Input/RequireInputFieldRowGrey.vue";
import RequireTextRow from "./components/Text/RequireTextRow.vue";
import RequireTextRowGrey from "./components/Text/RequireTextRowGrey.vue";
import RequireRadioChoiceRow from "./components/Radio/RequireRadioChoiceRow.vue";
import RequireRadioChoiceRowGrey from "./components/Radio/RequireRadioChoiceRowGrey.vue";
import RequireFileRow from "./components/File/RequireFileRow.vue";
import RequireFileRowGrey from "./components/File/RequireFileRowGrey.vue";

export function useModel() {
  // require Field names (add here if you need more)
  const requireField = {
    Input: "Input",
    Text: "Text",
    Radio: "Radio",
    File: "File",
  };
  // document header ref
  const documentHeader = ref("");

  // BEGIN -- v-Model for components --

  // active preview and edit component
  const activePeComponent = reactive({
    component: undefined,
    vModel: {},
    name: "",
  });


  const inputFieldRow = Object.freeze(InputFieldRow);
  const requireInputFieldRow = Object.freeze(RequireInputFieldRow);
  const requireInputFieldRowGrey = Object.freeze(RequireInputFieldRowGrey);
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

  const requireTextRow = Object.freeze(RequireTextRow);
  const requireTextRowGrey = Object.freeze(RequireTextRowGrey);
  const editorInput = reactive({
    text: "",
  });
  function resetEditorInput() {
    editorInput.text = "";
  }

  const requireRadioChoiceRow = Object.freeze(RequireRadioChoiceRow);
  const requireRadioChoiceRowGrey = Object.freeze(RequireRadioChoiceRowGrey);
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

  const requireFileRow = Object.freeze(RequireFileRow);
  const requireFileRowGrey = Object.freeze(RequireFileRowGrey);
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
  // END -- v-Model for components --

  // helper functions
  function addButtonsRowClicked(buttonType) {
    if (buttonType === requireField.Input) {
      activePeComponent.component = requireInputFieldRow;
      activePeComponent.vModel = inputFieldInput;
      activePeComponent.name = requireField.Input;
    } else if (buttonType === requireField.Text) {
      activePeComponent.component = requireTextRow;
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
    if (Object.keys(activePeComponent.vModel).length === 0) {
      if (buttonType.input) {
        activePeComponent.component = requireInputFieldRowGrey;
      } else if (buttonType.text) {
        activePeComponent.component = requireTextRowGrey;
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
    if (activePeComponent.name === requireField.Input) {
      resetInputFieldInput();
    } else if (activePeComponent.name === requireField.Text) {
      resetEditorInput();
    } else if (activePeComponent.name === requireField.Radio) {
      resetRadioChoiceInput();
    } else if (activePeComponent.name === requireField.File) {
      resetFileRequireInput();
    }
    activePeComponent.component = undefined;
    activePeComponent.vModel = {};
    activePeComponent.name = "";
  }

  const componentPreviewList = ref([]);
  function addComponentToPreviewList(component) {
    if (component.name === requireField.Input) {
      componentPreviewList.value.push({
        component: inputFieldRow,
        props: {
          preview: true,
        },
        vModel: reactive({
          name: inputFieldInput.name,
          inputFieldAllowed: { ...inputFieldInput.inputFieldAllowed },
        }),
      });
    } else if (component.name === requireField.Text) {
      componentPreviewList.value.push(requireTextRow);
    } else if (component.name === requireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (component.name === requireField.File) {
      componentPreviewList.value.push(requireFileRow);
    }
    resetActivePeComponent();
  }

  return {
    documentHeader,
    activePeComponent,
    componentPreviewList,
    addButtonsRowClicked,
    addButtonsRowHover,
    resetActivePeComponent,
    addComponentToPreviewList,
  };
}
