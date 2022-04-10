<script setup>
import { ref } from "vue";

defineProps({
  modelValue: Object,
});

const emptyString = ref('');
const checked = ref(true);
const unChecked = ref(false);
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="emptyString"
        outlined
        disable
        dense
        placeholder="Input Field Name"
      />
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-checkbox
        class="grey-checkbox"
        v-model="checked"
        disable
        label="A,b,c"
        color="info"
      />
      <q-checkbox
        class="grey-checkbox"
        v-model="unChecked"
        disable
        label="0,1,2"
        color="info"
      />
      <q-checkbox
        class="grey-checkbox"
        v-model="unChecked"
        disable
        label="*,$,%"
        color="info"
      />
    </div>
  </div>
  <AddButtonGrey />
</template>

<style scoped>
.grey-checkbox {
  color: var(--q-info);
}
</style>
