<script setup>
defineProps({
    smallScreen: Boolean
})
</script>

<template>
  <div
    class="row text-center add-button-row add-button-row-medium-screen"
    :class="{ 'add-button-row-small-screen': smallScreen }"
  >
    <div class="col">
      <q-btn
        unelevated
        class="no-shadow"
        icon-right="text_fields"
        color="accent"
      >
        <span v-if="!smallScreen">Input</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn unelevated icon-right="edit_note" color="accent">
        <span v-if="!smallScreen">Text</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn
        unelevated
        icon-right="library_add_check"
        color="accent"
      >
        <span v-if="!smallScreen">Radio</span>
      </q-btn>
    </div>
    <div class="col">
      <q-btn unelevated icon-right="save" color="accent">
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