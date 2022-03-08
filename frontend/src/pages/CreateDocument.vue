<script setup>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import MainLayout from "src/layouts/MainLayout.vue";
import QuestionButton from "../core/components/QuestionButton.vue";

const $q = useQuasar();

const smallScreen = ref(false);
function onResize(size) {
  if (size.width < 461) smallScreen.value = true;
  else smallScreen.value = false;
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
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
            <div class="col items-center plus-text-col">
              <span class="plus-text" style="background: white"
                >Add to Document</span
              >
            </div>
          </div>
          <div
            class="row text-center add-button-row add-button-row-medium-screen"
            :class="{ 'add-button-row-small-screen': smallScreen }"
          >
            <div class="col">
              <q-btn icon-right="text_fields" align="between" color="accent">
                <span v-if="!smallScreen">Input</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn icon-right="edit_note" align="between" color="accent">
                <span v-if="!smallScreen">Text</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                icon-right="library_add_check"
                align="between"
                color="accent"
              >
                <span v-if="!smallScreen">Radio</span>
              </q-btn>
            </div>
            <div class="col">
              <q-btn icon-right="save" align="between" color="accent">
                <span v-if="!smallScreen">File</span>
              </q-btn>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-xs-12 col-sm-4">
              <q-input
                v-model="inputName"
                outlined
                placeholder="Name of Input Field e.g. 'Address', 'Name'"
                :dense="true"
              />
              <!-- lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]" -->
            </div>
            <div class="col ml-small q-pa-md text-center">
              <q-chip
                :ripple="false"
                class="no-shadow"
                v-model:selected="inputAllowed.Text"
                square
                outline
                color="primary"
                text-color="white"
                icon="check_box_outline_blank"
                :class="{ 'grey-color': !inputAllowed.Text }"
              >
                A,b,c
              </q-chip>
              <q-chip
                :ripple="false"
                class="no-shadow"
                unelevated
                v-model:selected="inputAllowed.Numbers"
                square
                outline
                color="primary"
                text-color="white"
                icon="check_box_outline_blank"
                :class="{ 'grey-color': !inputAllowed.Numbers }"
              >
                0,1,2
              </q-chip>
              <q-chip
                :ripple="false"
                class="no-shadow"
                unelevated
                v-model:selected="inputAllowed.SpecialCharacters"
                square
                outline
                color="primary"
                text-color="white"
                icon="check_box_outline_blank"
                :class="{ 'grey-color': !inputAllowed.SpecialCharacters }"
              >
                *,%,$
              </q-chip>
              <question-button
                tooltip="Select the rules for the input field by toggling the chip buttons. A maximum of 50 characters is set for an input field."
              />
              <!-- <div>
                  <q-toggle
                    v-model="first"
                    icon="looks_one"
                  />
                  <q-toggle
                    v-model="second"
                    color="pink"
                    icon="mail"
                    label="Same Icon for each state"
                  />
                </div> -->

              <!-- checked-icon="star"
                unchecked-icon="star_border"
                indeterminate-icon="help" -->

              <!-- <q-checkbox
                  v-model="inputSelection"
                  checked-icon="star"
                  unchecked-icon="star_border"
                  indeterminate-icon="help"
                  val="xx"
                />
                <q-checkbox
                  v-model="inputSelection"
                  checked-icon="star"
                  unchecked-icon="star_border"
                  indeterminate-icon="help"
                  val="teal"
                  color="teal"
                />
                <q-checkbox
                  v-model="inputSelection"
                  val="orange"
                  color="orange"
                />
                <q-checkbox v-model="inputSelection" val="red" color="red" />
                <q-checkbox v-model="inputSelection" val="cyan" color="cyan" /> -->
            </div>
          </div>

          <!-- <div class="row">
            <div class="col">
              <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) => (val > 0 && val < 100) || 'Please type a real age',
                ]"
              />
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col">
              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col">
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </div>
          </div> -->
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
@import "../css/quasar.variables.scss";

.second-toolbar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.plus-text-col {
  background: #4d4d4d;
  height: 1px;
  margin-bottom: 3px;
  .plus-text {
    display: block;
    margin: 0 auto;
    margin-top: -11px;
    width: 115px;
  }
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

.grey-color {
  color: $info !important;
}

.q-field--highlighted {
  color: transparent !important;
}
</style>
