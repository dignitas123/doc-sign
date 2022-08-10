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
  const activePreviewComponent = reactive({
    component: undefined,
    vModel: {},
    type: '',
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
  function addButtonsRowClicked(type) {
    if (type === RequireField.Input) {
      activePreviewComponent.component = requireInputFieldRow;
      activePreviewComponent.vModel = inputFieldInput;
    } else if (type === RequireField.Text) {
      activePreviewComponent.component = requireTextRow;
      activePreviewComponent.vModel = editorInput;
    } else if (type === RequireField.Radio) {
      activePreviewComponent.component = requireRadioChoiceRow;
      activePreviewComponent.vModel = radioChoiceInput;
    } else if (type === RequireField.File) {
      activePreviewComponent.component = requireFileRow;
      activePreviewComponent.vModel = fileRequireInput;
    }
  }

  function addButtonsRowHover(type) {
    if (Object.keys(activePreviewComponent.vModel).length === 0) {
      if (type.input) {
        activePreviewComponent.component = requireInputFieldRowGrey;
      } else if (type.text) {
        activePreviewComponent.component = requireTextRowGrey;
      } else if (type.radio) {
        activePreviewComponent.component = requireRadioChoiceRowGrey;
      } else if (type.file) {
        activePreviewComponent.component = requireFileRowGrey;
      } else {
        resetactivePreviewComponent(type);
      }
    }
  }

  function resetactivePreviewComponent(type) {
    if (type === RequireField.Input) {
      resetInputFieldInput();
    } else if (type === RequireField.Text) {
      resetEditorInput();
    } else if (type === RequireField.Radio) {
      resetRadioChoiceInput();
    } else if (type === RequireField.File) {
      resetFileRequireInput();
    }
    activePreviewComponent.component = undefined;
    activePreviewComponent.vModel = {};
  }

  const componentPreviewList = ref([]);
  function addComponentToPreviewList(type, componentVModel) {
    if (type === RequireField.Input) {
      if (
        !componentPreviewList.value
          .map((componentDefinition) => componentDefinition.vModel.name)
          .includes(componentVModel.name)
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
        const duplicateComponentVModel = componentVModel;
        duplicateComponentVModel.name += componentPreviewList.value.filter(
          (componentDefinition) =>
            componentDefinition.vModel.name === componentVModel.name
        ).length;
        componentPreviewList.value.push({
          component: requireInputFieldRow,
          props: {
            preview: true,
          },
          vModel: duplicateComponentVModel,
        });
      }
    } else if (type === RequireField.Text) {
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
    } else if (type === RequireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (type === RequireField.File) {
      componentPreviewList.value.push(requireFileRow);
    }
    resetactivePreviewComponent(type);
  }

  function removeComponentFromPreviewList(type, name) {
    if (type === RequireField.Input) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel.name === name),
        1
      );
    } else if (type === RequireField.Text) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel.text === name),
        1
      );
    } else if (type === RequireField.Radio) {
      componentPreviewList.value.push(requireRadioChoiceRow);
    } else if (type === RequireField.File) {
      componentPreviewList.value.push(requireFileRow);
    }
  }

  return {
    documentHeader,
    activePreviewComponent,
    componentPreviewList,
    addButtonsRowClicked,
    addButtonsRowHover,
    resetactivePreviewComponent,
    addComponentToPreviewList,
    removeComponentFromPreviewList,
  };
}
