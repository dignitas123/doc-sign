<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import MainLayout from 'src/layouts/MainLayout.vue';
import DocumentHeaderRow from './components/DocumentHeaderRow.vue';
import AddButtonsRow from './components/AddButtonsRow.vue';
import { RequireField, useModel } from './create-document.model';
import HyphenText from 'src/core/components/hyphen-text.vue';

interface ValidationData {
  validated: boolean;
  message: string;
}

const {
  documentHeader,
  componentPreviewList,
  addButtonsRowClicked,
  activePreviewComponent,
  resetActivePreviewComponent,
  addComponentToPreviewList,
  removeComponentFromPreviewList,
} = useModel();

const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size: { width: number }) {
  if (size.width < 461) {
    smallScreen.value = true;
  } else smallScreen.value = false;
}

const accept = ref(false);

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted',
    });
  }
}

function onReset() {
  accept.value = false;
}

function peComponentClosed(type: RequireField) {
  resetActivePreviewComponent(type);
}

function peComponentAdded(type: RequireField, validationData: ValidationData) {
  if (validationData.validated) {
    addComponentToPreviewList(type, activePreviewComponent.vModel, false);
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: validationData.message,
    });
  }
}

function duplicatePeComponent(
  type: RequireField,
  componentVModel: Record<string, any>
) {
  addComponentToPreviewList(type, componentVModel, true);
}

function peComponentDeleted(data: { type: RequireField; name: string }) {
  removeComponentFromPreviewList(data.type, data.name);
}

const componentPreviewListUpdateKey = ref(0);

watch(componentPreviewList, () => {
  componentPreviewListUpdateKey.value++;
});
</script>

<template>
  <main-layout>
    <q-page class="items-center justify-evenly column">
      <div class="q-px-md shadow-3 absolute create-document">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="full-height"
          spellcheck="false"
        >
          <DocumentHeaderRow v-model="documentHeader" />
          <q-scroll-area
            class="preview-wrapper q-px-md"
            :key="componentPreviewList.length"
          >
            <template
              v-for="(componentDefinition, i) in componentPreviewList"
              :key="i"
            >
              <component
                :is="componentDefinition.component"
                v-bind="componentDefinition.props"
                v-model="componentDefinition.vModel"
                @delete="peComponentDeleted"
                @duplicate="duplicatePeComponent"
              />
            </template>
          </q-scroll-area>
        </q-form>
        <div class="absolute-bottom">
          <Transition name="fade">
            <div
              class="q-gutter-xs q-ma-lg input-component"
              v-if="activePreviewComponent.component"
            >
              <component
                :is="activePreviewComponent.component"
                v-model="activePreviewComponent.vModel"
                @add="peComponentAdded"
                @close="peComponentClosed"
              />
            </div>
          </Transition>
          <Transition name="slide">
            <div v-if="!activePreviewComponent.component">
              <HyphenText>Add to Document</HyphenText>
              <AddButtonsRow
                :smallScreen="smallScreen"
                @buttonClicked="addButtonsRowClicked"
              />
            </div>
          </Transition>
        </div>
        <q-resize-observer :debounce="0" @resize="onResize" />
      </div>
    </q-page>
    <template #secondToolbar>
      <div class="second-toolbar">
        <q-breadcrumbs>
          <q-breadcrumbs-el
            class="breadcumb-element"
            label="Documents"
            icon="description"
            to="/documents"
          />
        </q-breadcrumbs>
        <div class="text-h6" style="text-align: center; width: 100%">
          Create a New Document
        </div>
      </div>
    </template>
  </main-layout>
</template>

<style lang="scss" scoped>
.create-document {
  background: var(--q-secondary);
  max-width: 610px;
  height: 98%;
  width: 98%;
  .preview-wrapper {
    height: calc(100% - 130px);
    max-width: 572px;
    word-break: break-word;
  }
  .input-component {
    background: var(--q-secondary);
    box-shadow: 0px 0px 9px 20px var(--q-secondary);
  }
}
.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.q-field--highlighted {
  color: transparent !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-from {
  margin-bottom: -72px;
}

.slide-enter-active {
  transition: margin-bottom .8s ease-in;
}

.slide-enter-to {
  margin-bottom: 0px;
}

.slide-leave-from {
  margin-bottom: 0px;
}

.slide-leave-active {
  transition: margin-bottom .8s ease-out;
}

.slide-leave-to {
  margin-bottom: -72px;
}
</style>
