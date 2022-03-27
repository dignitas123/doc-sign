<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Document Title",
  },
});
defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);
</script>

<template>
  <div class="row">
    <div class="col">
      <q-input
        v-model="val"
        outlined
        dense
        autofocus
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
