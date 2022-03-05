<script setup>
import { useQuasar } from "quasar"
import { ref } from "vue"
import MainLayout from "src/layouts/MainLayout.vue"

const $q = useQuasar()

const name = ref(null)
const age = ref(null)
const accept = ref(false)
const documentHeader = ref("")
const mediumScreen = ref(false)
const smallScreen = ref(false)

function onResize(size) {
  if (size.width < 660)
    mediumScreen.value = true
  else
    mediumScreen.value = false

  if (size.width < 461)
    smallScreen.value = true
  else
    smallScreen.value = false
}

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    })
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    })
  }
}

function onReset() {
  name.value = null
  age.value = null
  accept.value = false
}
</script>

<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md shadow-1 absolute" style="top: 20px;">
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
          <div class="row text-center add-button-row" :class="{ 'add-button-row-medium-screen': mediumScreen }">
            <div class="col">
              <q-btn
                icon-right="text_fields"
                align="between"
                color="accent"
              >
                <template #default>
                  <span v-if="!smallScreen">Input</span>
                </template>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                icon-right="edit_note"
                align="between"
                color="accent"
              >
                <template #default>
                  <span v-if="!smallScreen">Text</span>
                </template>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                icon-right="library_add_check"
                align="between"
                color="accent"
              >
                <template #default>
                  <span v-if="!smallScreen">Radio</span>
                </template>
              </q-btn>
            </div>
              <div class="col">
                <q-btn
                  icon-right="save"
                  align="between"
                  color="accent"
                >
                  <template #default>
                    <span v-if="!smallScreen">File</span>
                  </template>
                </q-btn>
              </div>
          </div>
          <!-- <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
          </div> -->

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
        <q-resize-observer @resize="onResize" />
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
          Create a signable Ethereum Document
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<style lang="scss" scoped>
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
</style>