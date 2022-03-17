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
    width: fit-content;
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>