<script setup>
import { useQuasar } from "quasar";
import { ref, inject } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
import DocumentHeaderRow from "./components/DocumentHeaderRow.vue";
import AddButtonsRow from "./components/AddButtonsRow.vue";
import { useModel } from "./Index.model";

const {
  documentHeader,
  activePeComponent,
  componentPreviewList,
  addButtonsRowClicked,
  addButtonsRowHover,
  resetActivePeComponent,
  addComponentToPreviewList,
  removeComponentFromPreviewList,
  changeSavesToComponentPreview,
} = useModel();

const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size) {
  if (size.width < 461) {
    smallScreen.value = true;
  } else smallScreen.value = false;
}

const accept = ref(false);
function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  accept.value = false;
}

const emitter = inject("emitter");
emitter.on("peComponentClosed", () => {
  resetActivePeComponent();
});

emitter.on("editComponentChanged", (data) => {
  if (data.validated) {
    changeSavesToComponentPreview(activePeComponent);
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: data.message,
    });
  }
});

emitter.on("peComponentAdded", (data) => {
  if (data.validated) {
    addComponentToPreviewList(activePeComponent);
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: data.message,
    });
  }
});

emitter.on("peComponentDeleted", (data) => {
  removeComponentFromPreviewList(data.type, data.name)
})
</script>

<template>
  <main-layout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute create-document">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
          spellcheck="false"
        >
          <DocumentHeaderRow v-model="documentHeader" />
          <HyphenText v-if="componentPreviewList.length"
            >Document Preview</HyphenText
          >
          <template
            v-for="(componentDefinition, i) in componentPreviewList"
            :key="i"
          >
            <component
              :is="componentDefinition.component"
              v-bind="componentDefinition.props"
              v-model="componentDefinition.vModel"
            />
          </template>
          <HyphenText>Add to Document</HyphenText>
          <AddButtonsRow
            :smallScreen="smallScreen"
            @buttonClicked="addButtonsRowClicked"
            @mouseHover="addButtonsRowHover"
          />
          <Transition name="fade">
            <div v-if="activePeComponent.component" class="q-gutter-xs">
              <component
                :is="activePeComponent.component"
                v-model="activePeComponent.vModel"
              />
            </div>
          </Transition>
        </q-form>
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
          Create a Signable Ethereum Document
        </div>
      </div>
    </template>
  </main-layout>
</template>

<style lang="scss" scoped>
.create-document {
  background: var(--q-secondary);
  top: 20px;
  max-width: 552px;
  min-height: 92%;
}
.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.q-field--highlighted {
  color: transparent !important;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
