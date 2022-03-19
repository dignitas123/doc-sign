<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  placeholder: {
    type: String,
    default: "Input Field Name",
  },
});
const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const handleInput = () => emit("update:modelValue", val.value);
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-input
        v-model="val.name"
        outlined
        :placeholder="placeholder"
        :dense="true"
        @update="handleInput"
      />
      <!-- lazy-rules
            :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            ]" -->
    </div>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-checkbox v-model="val.inputFieldAllowed.Text" label="A,b,c" color="primary" />
      <q-checkbox
        v-model="val.inputFieldAllowed.Numbers"
        label="0,1,2"
        color="primary"
      />
      <q-checkbox
        v-model="val.inputFieldAllowed.SpecialCharacters"
        label="*,$,%"
        color="primary"
      />
    </div>
  </div>
</template>
