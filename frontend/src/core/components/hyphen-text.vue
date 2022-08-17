<template>
  <div class="row text-center">
    <div class="col items-center --plus-text-col">
      <span class="plus-text"><slot /></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--plus-text-col {
  background: $info-gray-line;
  color: $info-gray;
  height: 1px;
  margin-top: 9px;
  margin-bottom: 3px;

  .plus-text {
    background: var(--q-secondary);
    border-radius: 28px;
    display: block;
    margin: 0 auto;
    margin-top: -11px;
    width: fit-content;
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>
