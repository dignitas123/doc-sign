<script lang="ts" setup>
import { computed, reactive, ref, watch, withDefaults } from 'vue';
import {
  Alignment,
  RadioChoiceMode,
  RadioRowModel,
} from './require-radio-choice-row.model';

const props = withDefaults(
  defineProps<{
    modelValue?: RadioRowModel | undefined;
  }>(),
  {
    modelValue: undefined,
  }
);

defineEmits<{
  (event: 'update:modelValue'): void;
}>();

function getModelValue() {
  return (
    props.modelValue ??
    reactive<RadioRowModel>({
      name: '',
      radioChoiceMode: RadioChoiceMode.multiple_choice,
      radioOneCheck: true,
      radioChoices: [],
      alignment: Alignment.row,
    })
  );
}

const val = ref(getModelValue());

val.value.radioChoices.forEach((checkbox) => {
  checkbox.selected = false;
});

if (val.value.radioOneCheck && val.value.radioChoices.length > 0) {
  val.value.radioChoices[0].selected = true;
}

const alignmentClasses = computed(() => {
  return val.value.alignment === Alignment.row
    ? ['column items-start']
    : val.value.alignment === Alignment.column
    ? ['row']
    : [''];
});

const selectOptions = computed(() => {
  return val.value.radioChoices.map((checkbox) => checkbox.name);
});

const selectedOption = ref('');

const prevValue = ref<boolean[]>([]);

watch(
  () => val.value.radioChoices,
  (now) => {
    if (now.length < prevValue.value.length) {
      prevValue.value.pop();
    }

    const changedIndex = prevValue.value.findIndex(
      (selected, index) => selected !== now[index].selected
    );

    if (
      changedIndex !== -1 &&
      val.value.radioChoiceMode === RadioChoiceMode.single_choice
    ) {
      val.value.radioChoices.forEach((checkBox, index) => {
        if (index !== changedIndex && checkBox.selected) {
          checkBox.selected = false;
        }
      });
    }

    prevValue.value = [];
    now.forEach((el) => prevValue.value.push(el.selected));

    if (changedIndex !== -1) {
      selectedOption.value = now[changedIndex].name;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="radio-choice-row">
    <div class="row justify-center items-start">
      <div
        v-if="val.alignment !== Alignment.select"
        class="col-xs-12 col-sm-6 text-center"
      >
        <p class="q-my-xs">
          <b>{{ val.name }}:</b>
        </p>
      </div>
      <div class="col-xs-12 col-sm-6 text-center">
        <div :class="alignmentClasses">
          <template v-if="val.alignment === Alignment.select">
            <q-select
              v-model="selectedOption"
              :options="selectOptions"
              :label="val.name"
            />
          </template>
          <template v-else>
            <div v-for="(radioChoice, i) in val.radioChoices" :key="i">
              <q-checkbox
                v-model="val.radioChoices[i].selected"
                color="primary"
                :label="radioChoice.name"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-choice-row {
  max-height: calc(100vh - 415px);
  overflow-y: auto;
}
</style>

<style lang="scss">
.radio-choice-row {
  .radio-choice-toggle-align {
    .q-btn {
      border-right: 1px solid;
    }
  }
}
</style>
