<script setup>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: Object,
  },
});

const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const handleInput = () => emit("update:modelValue", val.value);
const endingName = ref("");

const endingExistsValues = ref([]);

watch(
  () => val.value.allowAllEndings,
  () => {
    if (val.value.allowAllEndings) {
      endingExistsValues.value = [];
      val.value.allowedEndings = [];
      handleInput();
    }
  }
);

function addEnding() {
  if (endingName.value) {
    if (/^\./.test(endingName.value)) {
      if (endingName.value.length < 7) {
        if (!val.value.allowedEndings.includes(endingName.value)) {
          val.value.allowedEndings.push(endingName.value);
          endingExistsValues.value.push(true);
          endingName.value = "";
          handleInput();
        } else {
          $q.notify({
            type: "info",
            message: `${endingName.value} already exists.`,
            timeout: 500,
          });
        }
      } else {
        $q.notify({
          type: "info",
          message: "A file ending can't have more than 5 characters.",
          timeout: 500,
        });
      }
    } else {
      if (endingName.value.length < 6) {
        if (!val.value.allowedEndings.includes("." + endingName.value)) {
          val.value.allowedEndings.push("." + endingName.value);
          endingExistsValues.value.push(true);
          endingName.value = "";
          handleInput();
        } else {
          $q.notify({
            type: "info",
            message: `${endingName.value} already exists.`,
            timeout: 500,
          });
        }
      } else {
        $q.notify({
          type: "info",
          message: "A file ending can't have more than 5 characters.",
          timeout: 500,
        });
      }
    }
  } else {
    $q.notify({
      type: "info",
      message: "You cannot add an empty file ending.",
      timeout: 500,
    });
  }
}

const fileDescriptionFocused = ref(false);
function focusFileDescription() {
  fileDescriptionFocused.value = true;
}
function unFocusFileDescription() {
  fileDescriptionFocused.value = false;
}

const fileEndingFocused = ref(false);
function focusFileEnding() {
  fileEndingFocused.value = true;
}
function unfocusFileEnding() {
  fileEndingFocused.value = false;
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="val.name"
        outlined
        dense
        :placeholder="fileDescriptionFocused ? '' : 'File Description'"
        @update="handleInput"
        @focus="focusFileDescription"
        @blur="unFocusFileDescription"
        @keydown.enter.prevent="$refs.endingNameInput.$el.focus()"
      />
    </div>
    <div
      class="col text-center ml-small justify-center"
      style="display: inline-flex"
    >
      <q-input
        ref="endingNameInput"
        v-model="endingName"
        outlined
        dense
        :placeholder="fileEndingFocused ? '' : '(.png, .pdf, ...)'"
        @focus="focusFileEnding"
        @blur="unfocusFileEnding"
        @keydown.enter.prevent="addEnding"
      />
      <q-btn
        class="ml-small"
        unelevated
        outline
        icon="add"
        style="margin-top: 1px"
        @click="
          addEnding();
          $refs.endingNameInput.$el.focus();
        "
      />
    </div>
  </div>
  <div v-if="val.allowedEndings.length" class="row">
    <div v-for="(name, i) in val.allowedEndings" :key="i">
      <q-chip
        removable
        outline
        v-model="endingExistsValues[i]"
        color="primary"
        text-color="white"
        :label="name"
        :title="name"
      />
    </div>
  </div>
  <div class="row">
    <div class="col text-center">
      <q-checkbox
        v-model="val.allowAllEndings"
        label="Allow all file endings"
        color="primary"
      />
    </div>
  </div>
  <AddButton />
</template>

<style scoped>
.q-chip {
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 2px;
  height: 25px;
}
</style>
