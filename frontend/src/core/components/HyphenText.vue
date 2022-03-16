<script setup>
import { reactive } from 'vue';
const props = defineProps({
  background: {
    type: String,
    default: "primary",
  },
});

const styleObject = reactive({
  background: props.background,
});
</script>

<template>
<div class="col items-center plus-text-col">
    <span class="plus-text"><slot /></span>
</div>
</template>

<style lang="scss">
.plus-text-col {
  background: var(--q-primary);
  height: 1px;
  margin-top: 9px;
  margin-bottom: 3px;

  .plus-text {
    background: var(--q-secondary);
    display: block;
    margin: 0 auto;
    margin-top: -11px;
    width: 115px;
  }
}
</style>