<script lang="ts" setup>
import { computed, reactive, ref, watch, withDefaults } from 'vue';
import {
  Alignment,
  RadioChoice,
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

defineEmits(['update:modelValue']);

function getModelValue() {
  return (
    props.modelValue ??
    reactive({
      name: '',
      radioChoice: RadioChoice.multiple_choice,
      radioOneCheck: true,
      radioChoiceNames: reactive([]),
      alignment: Alignment.row,
    })
  );
}

const val = ref(getModelValue());

const checkBoxValues = ref<boolean[]>([]);

const selectedValue = ref(val.value.radioChoiceNames[0]);

for (let i = 0; i < val.value.radioChoice.length; i++) {
  checkBoxValues.value.push(false);
}

if (val.value.radioOneCheck) {
  checkBoxValues.value[0] = true;
}

watch(
  () => [...checkBoxValues.value],
  (newValues, oldValues) => {
    // find out which value changed
    const newValueIndex = newValues.findIndex(
      (el, index) => el !== oldValues[index]
    );
    if (val.value.radioChoice === RadioChoice.single_choice) {
      const checkedValues = newValues.filter((el) => el === true).length;
      if (checkedValues > 1) {
        checkBoxValues.value = checkBoxValues.value.map((el, index) =>
          index === newValueIndex ? el : false
        );
      }
      selectedValue.value = val.value.radioChoiceNames[newValueIndex];
    }
  }
);

const alignmentClasses = computed(() => {
  return val.value.alignment === Alignment.row
    ? ['column items-start']
    : val.value.alignment === Alignment.column
    ? ['row']
    : [''];
});
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
              v-model="selectedValue"
              :options="val.radioChoiceNames"
              :label="val.name"
            />
          </template>
          <template v-else>
            <div v-for="(name, i) in val.radioChoiceNames" :key="i">
              <q-checkbox
                v-model="checkBoxValues[i]"
                color="primary"
                :label="name"
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
