<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref, watch, withDefaults } from 'vue';
import HyphenText from 'src/core/components/hyphen-text.vue';
import {
  RadioChoiceMode,
  Alignment,
  RadioRowModel,
} from './require-radio-choice-row.model';
import { RequireField } from '../../create-document.model';
import RadioChoiceRow from './radio-choice-row.vue';
import ConfirmCancel from 'src/core/components/confirm-cancel.vue';

const $q = useQuasar();

const props = withDefaults(
  defineProps<{
    modelValue: RadioRowModel | undefined;
    preview?: boolean;
    editActive?: boolean;
  }>(),
  {
    modelValue: undefined,
    preview: false,
    editActive: false,
  }
);

const emit = defineEmits([
  'update:modelValue',
  'add',
  'delete',
  'change',
  'close',
  'duplicate',
]);

const val = ref(props.modelValue);
const startValue = ref();

const nameInputRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (nameInputRef.value) {
    nameInputRef.value.focus();
  }
  startValue.value = { ...val.value };
  editActiveValue.value = props.editActive;
});

const choiceName = ref('');

function addradioChoice() {
  if (choiceName.value) {
    val.value.radioChoices.push({
      name: choiceName.value,
      selected: false,
    });
    choiceName.value = '';
  } else {
    $q.notify({
      type: 'negative',
      message: 'You cannot add an empty Choice.',
      timeout: 500,
    });
  }
}

function removeradioChoice() {
  val.value.radioChoices.pop();
}

const radioChoiceTitleFocused = ref(false);
function focusRadioChoiceTitle() {
  radioChoiceTitleFocused.value = true;
}
function unfocusRadioChoiceTitle() {
  radioChoiceTitleFocused.value = false;
}

const choiceNameFocused = ref(false);
function focusChoiceName() {
  choiceNameFocused.value = true;
}
function unfocusChoiceName() {
  choiceNameFocused.value = false;
}

const currentChoice = ref(val.value.radioChoiceMode);

watch(
  () => val.value.radioChoiceMode,
  (newChoice: RadioChoiceMode) => {
    if (
      currentChoice.value === RadioChoiceMode.multiple_choice &&
      newChoice === RadioChoiceMode.single_choice
    ) {
      const selectedCount = val.value.radioChoices.filter(
        (checkbox) => checkbox.selected === true
      ).length;
      if (selectedCount === 0 || selectedCount > 1) {
        val.value.radioChoices.forEach((checkbox, index) => {
          if (index === 0) {
            checkbox.selected = true;
          } else {
            checkbox.selected = false;
          }
        });
      }
    }
    if (currentChoice.value !== val.value.radioChoiceMode)
      currentChoice.value = val.value.radioChoiceMode;
  }
);

watch(
  () => val.value.alignment,
  (now) => {
    if (now === Alignment.select) {
      val.value.radioChoiceMode = RadioChoiceMode.single_choice;
    }
  }
);

const deleteConfirm = ref(false);

const editActiveValue = ref(false);

const validated = computed(() => {
  return !!val.value.name.length && !!val.value.radioChoices.length;
});

watch(editActiveValue, (editActiveValue) => {
  if (editActiveValue) {
    val.value.radioChoices.forEach((checkbox) => (checkbox.selected = false));

    if (val.value.radioOneCheck) {
      val.value.radioChoices[0] = {
        name: val.value.radioChoices[0].name,
        selected: true,
      };
    }
  }
});

const validationMessages = computed(() => {
  let messages: string[] = [];
  if (!val.value.name.length) {
    messages.push("Name of Radio Choice can't be empty.");
  }
  if (!val.value.radioChoices.length) {
    messages.push('At least one Choice has to be added.');
  }
  return validated.value ? [''] : messages;
});

function setEditActive() {
  editActiveValue.value = true;
}

function saveChanges() {
  if (validated.value) {
    editActiveValue.value = false;
    emit('close', { type: RequireField.Radio, value: val.value });
  }
}

function closeWindow() {
  if (editActiveValue.value) {
    val.value = startValue.value;
    editActiveValue.value = false;
  }
  emit('close', { type: RequireField.Radio, value: startValue.value });
}

function addPreviewComponent() {
  emit('add', RequireField.Radio, {
    validated: validated.value,
    messages: validationMessages.value,
  });
}

function deleteInputFieldRow() {
  emit('delete', {
    type: RequireField.Radio,
    name: val.value.name,
  });
}

function duplicateRow() {
  emit('duplicate', RequireField.Radio, val.value);
}

function requireRowClosed(data: { value: RadioRowModel }) {
  editActiveValue.value = false;
  val.value = data.value;
}

const choiceNameInput = ref<HTMLElement>();
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end" style="margin-bottom: 2px">
      <q-btn dense flat icon="edit" size="xs" @click="setEditActive"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Edit</q-tooltip></q-btn
      >
      <q-btn dense flat icon="content_copy" size="xs" @click="duplicateRow"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Duplicate</q-tooltip></q-btn
      >
      <q-btn dense flat icon="delete" size="xs" @click="deleteConfirm = true"
        ><q-tooltip :delay="1500" :offset="[0, 10]">Delete</q-tooltip></q-btn
      >
    </div>
    <div v-if="editActiveValue" class="dotted-border">
      <RequireRadioChoiceRow
        v-model="val"
        @close="requireRowClosed"
        editActive
      />
    </div>
    <RadioChoiceRow v-else v-model="val" />
  </template>
  <template v-else>
    <template v-if="val.name">
      <HyphenText class="q-mt-sm q-mb-sm">Preview</HyphenText>
      <RadioChoiceRow v-if="val.name" v-model="val" />
      <div class="row items-center">
        <div class="col-xs-12 col-sm-6 text-center q-my-xs justify-center">
          <q-checkbox
            v-model="val.radioOneCheck"
            label="One choice must be selected"
            color="primary"
          />
        </div>
        <div class="col-xs-12 col-sm-6 text-center q-my-xs justify-center">
          <q-btn-toggle
            v-model="val.alignment"
            class="radio-choice-toggle-align"
            no-caps
            dense
            unelevated
            toggle-color="primary"
            color="secondary"
            text-color="primary"
            :options="[
              { value: Alignment.row, slot: 'column' },
              { value: Alignment.column, slot: 'row' },
              { value: Alignment.select, slot: 'select' },
            ]"
          >
            <template #column>
              <q-icon name="format_list_bulleted" />
            </template>
            <template #row>
              <q-icon name="more_horiz" />
            </template>
            <template #select>
              <q-icon name="arrow_drop_down" />
            </template>
          </q-btn-toggle>
        </div>
      </div>
    </template>
    <div class="row items-center">
      <div class="col-xs-12 col-sm-6 q-my-xs">
        <q-input
          ref="nameInputRef"
          v-model="val.name"
          outlined
          label="Radio Choice Title"
          @focus="focusRadioChoiceTitle"
          @blur="unfocusRadioChoiceTitle"
          @keydown.enter.prevent="choiceNameInput?.focus()"
          maxlength="63"
        />
      </div>
      <div class="col-xs-12 col-sm-6 text-center q-my-xs justify-center">
        <q-btn-toggle
          v-model="val.radioChoiceMode"
          class="radio-choice-toggle-multi-single-choice"
          no-caps
          unelevated
          toggle-color="accent"
          color="secondary"
          text-color="accent"
          :options="[
            {
              label: 'Multiple Choice',
              value: RadioChoiceMode.multiple_choice,
            },
            { label: 'Single Choice', value: RadioChoiceMode.single_choice },
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 q-my-xs">
        <q-input
          ref="choiceNameInput"
          v-model="choiceName"
          outlined
          :disable="val.name ? false : true"
          label="Choice Name"
          :placeholder="val.radioChoices.length ? '' : 'Choice1, Choice2'"
          @focus="focusChoiceName"
          @blur="unfocusChoiceName"
          @keydown.enter.prevent="addradioChoice"
          maxlength="63"
        />
      </div>
      <div
        class="col-xs-12 col-sm-6 q-my-xs text-center justify-center self-center"
        style="display: inline-flex; height: 50%"
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
            addradioChoice();
            choiceNameInput?.focus();
          "
        />
        <q-btn
          class="q-ml-xs"
          unelevated
          outline
          :color="val.radioChoices.length ? 'primary' : 'info'"
          icon="remove"
          :disabled="val.radioChoices.length ? false : true"
          style="margin-top: 1px"
          @click="
            removeradioChoice();
            choiceNameInput?.focus();
          "
        />
      </div>
    </div>
    <HyphenText />
    <ConfirmCancel
      v-if="editActiveValue"
      confirmText="Save Changes"
      @confirm="saveChanges"
      @cancel="closeWindow"
    />
    <ConfirmCancel
      v-else
      confirmText="Add"
      @confirm="addPreviewComponent"
      @cancel="closeWindow"
    />
  </template>
  <q-dialog v-model="deleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to delete this row?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          outline
          label="Delete"
          color="accent"
          v-close-popup
          @click="deleteInputFieldRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.radio-choice-toggle-multi-single-choice {
  border: 1px solid var(--q-accent);
}

.radio-choice-toggle-align {
  border: 1px solid var(--q-primary);
}
</style>
