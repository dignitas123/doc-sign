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
}

export function useModel() {
  // document header ref
  const documentHeader = ref('');

  const $q = useQuasar();

  // BEGIN -- v-Model for components --

  // active preview and edit component
  const activePreviewComponent = reactive<ComponentDefinition>({
    component: undefined,
    vModel: undefined,
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

  function resetActivePreviewComponent(type: RequireField) {
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
    activePreviewComponent.vModel = undefined;
  }

  const componentPreviewList = ref<ComponentDefinition[]>([]);
  function addComponentToPreviewList(
    type: RequireField,
    componentVModel: Record<string, any> | undefined,
    duplication: boolean
  ) {
    if (type === RequireField.Input) {
      const index = componentPreviewList.value.findIndex(
        (component) =>
          component.vModel?.name &&
          component.vModel?.name === componentVModel?.name
      );
      if (index === -1) {
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
        const duplicateComponentVModel = { ...componentVModel };  
        if(duplication && /\(\d\)$/.test(duplicateComponentVModel.name)) {
          duplicateComponentVModel.name = duplicateComponentVModel.name.split('(')[0];
        }
        const duplicates = componentPreviewList.value.filter(
          (componentDefinition) =>
            componentDefinition.vModel?.name === duplicateComponentVModel?.name ||
            (componentDefinition.vModel?.name.split('(').length > 1 &&
              componentDefinition.vModel?.name.split('(')[0] ===
              duplicateComponentVModel?.name &&
              /\d\)/.test(componentDefinition.vModel?.name.split('(')[1]))
        ).length;
        
        duplicateComponentVModel.name += `(${duplicates + 1})`;

        if(duplication) {
          componentPreviewList.value.splice(index + 1, 0,
            {
              component: requireInputFieldRow,
              props: {
                preview: true,
              },
              vModel: duplicateComponentVModel,
            });
        } else {
          componentPreviewList.value.push({
            component: requireInputFieldRow,
            props: {
              preview: true,
            },
            vModel: duplicateComponentVModel,
          });
        }
      }
    } else if (type === RequireField.Text) {
      const index = componentPreviewList.value.findIndex(
        (component) =>
          component.vModel?.text &&
          component.vModel?.text === componentVModel?.text
      );
      if (
        index === -1
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
        if(duplication) {
          const duplicateComponentVModel = { ...componentVModel }; 
          componentPreviewList.value.splice(index + 1, 0,
            {
              component: requireTextRow,
              props: {
                preview: true,
              },
              vModel: duplicateComponentVModel,
            });
        } else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `A Text Row with the same text already exists.`,
          });
        }
      }
    } else if (type === RequireField.Radio) {
      componentPreviewList.value.push({ component: requireRadioChoiceRow });
    } else if (type === RequireField.File) {
      componentPreviewList.value.push({ component: requireFileRow });
    }
    resetActivePreviewComponent(type);
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
      componentPreviewList.value.push({ component: requireRadioChoiceRow });
    } else if (type === RequireField.File) {
      componentPreviewList.value.push({ component: requireFileRow });
    }
  }

  return {
    documentHeader,
    activePreviewComponent,
    componentPreviewList,
    addButtonsRowClicked,
    resetActivePreviewComponent,
    addComponentToPreviewList,
    removeComponentFromPreviewList,
  };
}
