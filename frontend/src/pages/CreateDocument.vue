<script setup>
import { useQuasar } from "quasar";
import { computed, ref, reactive, watch } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";

const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size) {
  if (size.width < 461) {
    smallScreen.value = true;
  } else smallScreen.value = false;
}

// form
const name = ref(null);
const age = ref(null);
const accept = ref(false);
const documentHeader = ref("");
const inputName = ref();
// const inputSelection = ref([]);
// const first = ref(true);
// const second = ref(true);

const inputAllowed = reactive({
  Text: true,
  Numbers: false,
  SpecialCharacters: false,
});
watch(inputAllowed, () => {
  let allFalse = (arr) => arr.every((v) => v === false);
  if (
    allFalse(
      Object.values(inputAllowed).map((val) => {
        return val;
      })
    )
  )
    inputAllowed.Text = true;
});

//text editor
const editor = ref("");

const toolbarTextDesktopItems = ref([
  ["link"],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
  ],
  ["unordered", "ordered", "outdent", "indent"],
]);

const editorToolBarItems = computed(() => {
  return reactive([
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: "only-icons",
        options: ["left", "center", "right", "justify"],
      },
    ],
    ["bold", "italic", "underline"],
    ...($q.screen.lt.sm ? [] : toolbarTextDesktopItems.value),
  ]);
});

// radio
const radioChoice = ref("multiple_choice");
const radioOneCheck = ref(false);

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
  name.value = null;
  age.value = null;
  accept.value = false;
}
</script>

<template>
  <main-layout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute" style="top: 20px">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md-top-bottom"
        >
          <div class="row">
            <div class="col">
              <q-input
                v-model="documentHeader"
                outlined
                placeholder="Document Title"
                :dense="true"
              />
            </div>
          </div>
          <div class="row text-center">
            <!-- <div class="col items-center plus-text-col">
              <span class="plus-text" style="background: white"
                >Add to Document</span
              >
            </div> -->
            <HyphenText>Add to Document</HyphenText>
          </div>
          <div
            class="row text-center add-button-row add-button-row-medium-screen"
            :class="{ 'add-button-row-small-screen': smallScreen }"
          >
            <div class="col">
              <q-btn
                unelevated
                class="no-shadow"
                icon-right="text_fields"
                align="between"
                color="accent"
              >
                <span v-if="!smallScreen">Input</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                unelevated
                icon-right="edit_note"
                align="between"
                color="accent"
              >
                <span v-if="!smallScreen">Text</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                unelevated
                icon-right="library_add_check"
                align="between"
                color="accent"
              >
                <span v-if="!smallScreen">Radio</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                unelevated
                icon-right="save"
                align="between"
                color="accent"
              >
                <span v-if="!smallScreen">File</span>
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="inputName"
                outlined
                placeholder="Input Field Name"
                :dense="true"
              />
              <!-- lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" -->
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
              <q-checkbox
                v-model="inputAllowed.Text"
                label="A,b,c"
                color="primary"
              />
              <q-checkbox
                v-model="inputAllowed.Numbers"
                label="0,1,2"
                color="primary"
              />
              <q-checkbox
                v-model="inputAllowed.SpecialCharacters"
                label="*,$,%"
                color="primary"
              />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <q-btn
                class="no-shadow"
                unelevated
                color="accent"
                style="width: 100%"
              >
                Add
              </q-btn>
            </div>
          </div>
          <div class="row items-center">
            <div class="col">
              <q-editor v-model="editor" :toolbar="editorToolBarItems" />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="inputName"
                outlined
                placeholder="Radio Field Name"
                :dense="true"
              />
              <!-- lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" -->
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
              <q-btn-toggle
                v-model="radioChoice"
                class="radio-choice-toggle ml-small"
                :class="{ 'mt-small': $q.screen.lt.sm }"
                no-caps
                rounded
                unelevated
                toggle-color="accent"
                color="secondary"
                text-color="accent"
                :options="[
                  { label: 'Multiple Choice', value: 'multiple_choice' },
                  { label: 'Single Choice', value: 'single_choice' },
                ]"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-checkbox
                v-model="radioOneCheck"
                label="At least one choice must be selected."
                color="primary"
              />
            </div>
          </div>
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
.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

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

.q-field--highlighted {
  color: transparent !important;
}

.radio-choice-toggle {
  border: 1px solid var(--q-accent);
}
</style>
