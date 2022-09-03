<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import MainLayout from 'src/layouts/main-layout.vue';
import DocumentHeaderRow from './components/document-header-row.vue';
import AddButtonsRow from './components/add-buttons-row.vue';
import { RequireField, useCreateDocumentModel } from './create-document.model';
import HyphenText from 'src/core/components/hyphen-text.vue';

interface ValidationData {
  validated: boolean;
  messages: string[];
}

const {
  documentHeader,
  componentPreviewList,
  addButtonsRowClicked,
  activePreviewComponent,
  resetActivePreviewComponent,
  addComponentToPreviewList,
  removeComponentFromPreviewList,
} = useCreateDocumentModel();

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

function previewComponentClosed(data: { type: RequireField }) {
  resetActivePreviewComponent(data.type);
}

function previewComponentAdded(
  type: RequireField,
  validationData: ValidationData
) {
  if (validationData.validated) {
    addComponentToPreviewList(type, activePreviewComponent.vModel, false);
  } else {
    validationData.messages.forEach((message) => {
      $q.notify({
        type: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: message,
        timeout: 500,
      });
    });
  }
}

function duplicatePreviewComponent(
  type: RequireField,
  componentVModel: Record<string, string>
) {
  addComponentToPreviewList(type, componentVModel, true);
}

function previewComponentDeleted(data: { type: RequireField; name: string }) {
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
      <div class="shadow-3 absolute create-document">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="full-height"
          spellcheck="false"
        >
          <DocumentHeaderRow v-model="documentHeader" />
          <q-scroll-area
            class="preview-wrapper q-px-md q-mx-xs"
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
                @delete="previewComponentDeleted"
                @duplicate="duplicatePreviewComponent"
              />
            </template>
          </q-scroll-area>
        </q-form>
        <div class="absolute-bottom">
          <Transition name="fade">
            <div
              class="q-ma-lg input-component"
              v-if="activePreviewComponent.component"
            >
              <component
                :is="activePreviewComponent.component"
                v-model="activePreviewComponent.vModel"
                @add="previewComponentAdded"
                @close="previewComponentClosed"
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-from {
  margin-bottom: -72px;
}

.slide-enter-active {
  transition: margin-bottom 0.8s ease-in;
}

.slide-enter-to {
  margin-bottom: 0px;
}

.slide-leave-from {
  margin-bottom: 0px;
}

.slide-leave-active {
  transition: margin-bottom 0.8s ease-out;
}

.slide-leave-to {
  margin-bottom: -72px;
}
</style>
