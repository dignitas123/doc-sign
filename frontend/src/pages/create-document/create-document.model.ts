import { reactive, ref } from 'vue';
import RequireInputFieldRow from './components/Input/RequireInputFieldRow.vue';
import RequireTextRow from './components/Text/RequireTextRow.vue';
import RequireRadioChoiceRow from './components/Radio/RequireRadioChoiceRow.vue';
import RequireFileRow from './components/File/RequireFileRow.vue';
import { useQuasar } from 'quasar';
import { ComponentDefinition } from 'src/core/interfaces/component-definition';

// require Field names (add here if you need more)
export enum RequireField {
  Input = 'Input',
  Text = 'Text',
  Radio = 'Radio',
  File = 'File',
};

export function useModel() {
  // document header ref
  const documentHeader = ref('');

  const $q = useQuasar();

  // BEGIN -- v-Model for components --

  // active preview and edit component
  const activePreviewComponent = reactive<ComponentDefinition>({
    component: undefined,
    vModel: {},
  });

  const requireInputFieldRow = Object.freeze(RequireInputFieldRow);
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
  const editorInput = reactive({
    text: '',
  });
  function resetEditorInput() {
    editorInput.text = '';
  }

  const requireRadioChoiceRow = Object.freeze(RequireRadioChoiceRow);
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
  function addButtonsRowClicked(type: RequireField) {
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

  function resetactivePreviewComponent(type: RequireField) {
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

  const componentPreviewList = ref<ComponentDefinition[]>([]);
  function addComponentToPreviewList(type: RequireField, componentVModel: Record<string, any>) {
    if (type === RequireField.Input) {
      if (
        !componentPreviewList.value
          .map((componentDefinition) => componentDefinition.vModel?.name)
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
        const duplicateComponentVModel = {...componentVModel};
        const duplicates = componentPreviewList.value.filter(
          (componentDefinition) =>
            componentDefinition.vModel?.name === componentVModel.name
        ).length;
        duplicateComponentVModel.name += `(${duplicates})`
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
          .map((componentDefinition) => componentDefinition.vModel?.text)
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
      componentPreviewList.value.push({component: requireRadioChoiceRow});
    } else if (type === RequireField.File) {
      componentPreviewList.value.push({component: requireFileRow});
    }
    resetactivePreviewComponent(type);
  }

  function removeComponentFromPreviewList(type: RequireField, name: string) {
    if (type === RequireField.Input) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel?.name === name),
        1
      );
    } else if (type === RequireField.Text) {
      componentPreviewList.value.splice(
        componentPreviewList.value.findIndex((el) => el.vModel?.text === name),
        1
      );
    } else if (type === RequireField.Radio) {
      componentPreviewList.value.push({component: requireRadioChoiceRow});
    } else if (type === RequireField.File) {
      componentPreviewList.value.push({component: requireFileRow});
    }
  }

  return {
    documentHeader,
    activePreviewComponent,
    componentPreviewList,
    addButtonsRowClicked,
    resetactivePreviewComponent,
    addComponentToPreviewList,
    removeComponentFromPreviewList,
  };
}
