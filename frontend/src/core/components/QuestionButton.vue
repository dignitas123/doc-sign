<script setup>
defineProps({
  tooltip: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <q-btn
    :ripple="false"
    outline
    color="info"
    unelevated
    class="question-button"
    icon="question_mark"
  >
    <q-tooltip v-if="tooltip" anchor="bottom left">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>

<style lang="scss" scoped>
@import "../../css/quasar.variables.scss";

.question-button {
  height: auto;
  &:hover {
    color: $primary !important;
  }
}
</style>
