import { reactive, ref } from 'vue';
import RequireInputFieldRow from './components/Input/RequireInputFieldRow.vue';
import RequireInputFieldRowGrey from './components/Input/RequireInputFieldRowGrey.vue';
import RequireTextRow from './components/Text/RequireTextRow.vue';
import RequireTextRowGrey from './components/Text/RequireTextRowGrey.vue';
import RequireRadioChoiceRow from './components/Radio/RequireRadioChoiceRow.vue';
import RequireRadioChoiceRowGrey from './components/Radio/RequireRadioChoiceRowGrey.vue';
import RequireFileRow from './components/File/RequireFileRow.vue';
import RequireFileRowGrey from './components/File/RequireFileRowGrey.vue';
import { useQuasar } from 'quasar';

// require Field names (add here if you need more)
export const RequireField = {
  Input: 'Input',
  Text: 'Text',
  Radio: 'Radio',
  File: 'File',
};

export function useModel() {
  // document header ref
  const documentHeader = ref('');

  const $q = useQuasar();

  // BEGIN -- v-Model for components --

  // active preview and edit component
  const activePeComponent = reactive({
    component: undefined,
    vModel: {},
    name: '',
  });

  const requireInputFieldRow = Object.freeze(RequireInputFieldRow);
  const requireInputFieldRowGrey = Object.freeze(RequireInputFieldRowGrey);
  const inputFieldInput = reactive({
    name: '',
    inputFieldAllowed: reactive({
      Text: true,
      Numbers: false,
      SpecialCharacters: false,
    }),
    textAreaSize: 'small_input_field',
    maxLength: 64,
  });
  function resetInputFieldInput() {
    inputFieldInput.name = '';
    inputFieldInput.inputFieldAllowed = reactive({
      Text: true,
      Numbers: false,
      SpecialCharacters: false,
    });
    inputFieldInput.textAreaSize = 'small_input_field';
    inputFieldInput.maxLength = 64;
  }

  const requireTextRow = Object.freeze(RequireTextRow);
  const requireTextRowGrey = Object.freeze(RequireTextRowGrey);
  const editorInput = reactive({
    text: '',
  });
  function resetEditorInput() {
    editorInput.text = '';
  }

  const requireRadioChoiceRow = Object.freeze(RequireRadioChoiceRow);
  const requireRadioChoiceRowGrey = Object.freeze(RequireRadioChoiceRowGrey);
  const radioChoiceInput = reactive({
    name: '',
    radioChoice: 'multiple_choice',
    radioOneCheck: true,
    radioChoiceNames: reactive([]),
  });
  function resetRadioChoiceInput() {
    radioChoiceInput.name = '';
    radioChoiceInput.radioChoice = 'multiple_choice';
    radioChoiceInput.radioOneCheck = true;
    radioChoiceInput.radioChoiceNames = reactive([]);
  }

  const requireFileRow = Object.freeze(RequireFileRow);
  const requireFileRowGrey = Object.freeze(RequireFileRowGrey);
  const fileRequireInput = reactive({
    name: '',
    allowAllEndings: false,
    allowedEndings: reactive([]),
  });
  function resetFileRequireInput() {
    fileRequireInput.name = '';
    fileRequireInput.allowAllEndings = false;
    fileRequireInput.allowedEndings = reactive([]);
  }
  // END -- v-Model for components --

  // helper functions
  function addButtonsRowClicked(buttonType) {
    if (buttonType === RequireField.Input) {
      activePeComponent.component = requireInputFieldRow;
      activePeComponent.vModel = inputFieldInput;
      activePeComponent.name = RequireField.Input;
    } else if (buttonType === RequireField.Text) {
      activePeComponent.component = requireTextRow;
      activePeComponent.vModel = editorInput;
      activePeComponent.name = RequireField.Text;
    } else if (buttonType === RequireField.Radio) {
      activePeComponent.component = requireRadioChoiceRow;
      activePeComponent.vModel = radioChoiceInput;
      activePeComponent.name = RequireField.Radio;
    } else if (buttonType === RequireField.File) {
      activePeComponent.component = requireFileRow;
      activePeComponent.vModel = fileRequireInput;
      activePeComponent.name = RequireField.File;
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
    if (activePeComponent.name === RequireField.Input) {
      resetInputFieldInput();
    } else if (activePeComponent.name === RequireField.Text) {
      resetEditorInput();
    } else if (activePeComponent.name === RequireField.Radio) {
      resetRadioChoiceInput();
    } else if (activePeComponent.name === RequireField.File) {
      resetFileRequireInput();
    }
    activePeComponent.component = undefined;
    activePeComponent.vModel = {};
    activePeComponent.name = '';
  }

  const componentPreviewList = ref([]);
  function addComponentToPreviewList(component) {
    if (component.name === RequireField.Input) {
      if (
        !componentPreviewList.value
          .map((componentDefinition) => componentDefinition.vModel.name)
          .includes(inputFieldInput.name)
      ) {
        componentPreviewList.value.push({
          component: requireInputFieldRow,
          props: {
            preview: true,
          },
          vModel: reactive({
            name: inputFieldInput.name,
            inputFieldAllowed: { ...inputFieldInput.inputFieldAllowed },
            textAreaSize: inputFieldInput.textAreaSize,
            maxLength: inputFieldInput.maxLength,
          }),
        });
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `Row '${inputFieldInput.name}' already exists.`,
        });
      }
    } else if (component.name === RequireField.Text) {
      if (
        !componentPreviewList.value
          .map((componentDefinition) => componentDefinition.vModel.text)
          .includes(editorInput.text)
      ) {
        componentPreviewList.value.push({
          component: requireTextRow,
          props: {
            preview: true,
          },
          vModel: reactive({
            text: editorInput.text,
          }),
        });
      } else {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `A Text Row with the same text already exists.`,
        });
      }
    } else if (component.name === RequireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (component.name === RequireField.File) {
      componentPreviewList.value.push(requireFileRow);
    }
    resetActivePeComponent();
  }

  function removeComponentFromPreviewList(requireField, name) {
    if (requireField === RequireField.Input) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel.name === name),
        1
      );
    } else if (requireField === RequireField.Text) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel.text === name),
        1
      );
    } else if (requireField === RequireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (requireField === RequireField.File) {
      componentPreviewList.value.push(requireFileRow);
    }
  }

  function changeSavesToComponentPreview(component) {
    if (component.name === RequireField.Input) {
      componentPreviewList.value.push({
        component: requireInputFieldRow,
        props: {
          preview: true,
        },
        vModel: reactive({
          name: inputFieldInput.name,
          inputFieldAllowed: { ...inputFieldInput.inputFieldAllowed },
          textAreaSize: inputFieldInput.textAreaSize,
          maxLength: inputFieldInput.maxLength,
        }),
      });
    } else if (component.name === RequireField.Text) {
      componentPreviewList.value.push(requireTextRow);
    } else if (component.name === RequireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (component.name === RequireField.File) {
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
    removeComponentFromPreviewList,
    changeSavesToComponentPreview,
  };
}
