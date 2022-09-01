<script setup>
import { reactive, watch } from 'vue';

defineProps({
  smallScreen: Boolean,
});

const emit = defineEmits(['buttonClicked', 'mouseHover']);

const emitButtonClicked = (type) => emit('buttonClicked', type);
const emitMouseHover = (hover) => emit('mouseHover', hover);

const hover = reactive({
  input: false,
  text: false,
  radio: false,
  file: false,
});

watch(hover, () => {
  emitMouseHover(hover);
});
</script>

<template>
  <div
    class="row q-pb-sm text-center add-button-row add-button-row-medium-screen"
    :class="{ 'add-button-row-small-screen': smallScreen }"
  >
    <div class="col">
      <q-btn
        unelevated
        rounded
        class="no-shadow"
        icon-right="text_fields"
        color="accent"
        @click="emitButtonClicked('Input')"
        @mouseover="hover.input = true"
        @mouseleave="hover.input = false"
      >
        <span v-if="!smallScreen">Input</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn
        unelevated
        rounded
        icon-right="edit_note"
        color="accent"
        @click="emitButtonClicked('Text')"
        @mouseover="hover.text = true"
        @mouseleave="hover.text = false"
      >
        <span v-if="!smallScreen">Text</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn
        unelevated
        rounded
        icon-right="library_add_check"
        color="accent"
        @click="emitButtonClicked('Radio')"
        @mouseover="hover.radio = true"
        @mouseleave="hover.radio = false"
      >
        <span v-if="!smallScreen">Choice</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn
        unelevated
        rounded
        icon-right="save"
        color="accent"
        @click="emitButtonClicked('File')"
        @mouseover="hover.file = true"
        @mouseleave="hover.file = false"
      >
        <span v-if="!smallScreen">File</span>
      </q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-button-row {
  margin-top: 5px;
  .col {
    padding: 5px;
  }
}

.add-button-row-medium-screen {
  .col {
    width: 130px;
  }
}

.add-button-row-small-screen {
  .col {
    width: none !important;
  }
}
</style>
