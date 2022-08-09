<script setup>
import { ref } from 'vue';
import ConfirmCancelGrey from 'src/core/components/confirm-cancel-grey.vue';

defineProps({
  modelValue: Object,
});

defineEmits(['add', 'delete', 'change', 'close']);

const emptyString = ref('');
const checked = ref(true);
const unChecked = ref(false);
const smallInputChecked = ref('small_input_field');
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="emptyString"
        outlined
        disable
        dense
        placeholder="Input Label (Name, Address, ...)"
      />
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-checkbox v-model="checked" disable label="A,b,c" color="info" />
      <q-checkbox v-model="unChecked" disable label="0,1,2" color="info" />
      <q-checkbox v-model="unChecked" disable label="*,$,%" color="info" />
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-10 text-center">
      <q-radio
        disabled
        v-model="smallInputChecked"
        val="small_input_field"
        label="Small Input Field"
      />
      <q-radio
        disabled
        v-model="smallInputChecked"
        val="big_input_field"
        label="Big Input Field"
      />
      <q-radio
        disabled
        v-model="smallInputChecked"
        val="textarea"
        label="Textarea"
      />
    </div>
  </div>
  <ConfirmCancelGrey />
</template>
