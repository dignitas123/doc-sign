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
const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const handleInput = () => emit("update:modelValue", val.value);
</script>

<template>
  <div class="row">
    <div class="col">
      <q-input
        v-model="val"
        outlined
        dense
        :placeholder="placeholder"
        @update="handleInput"
      />
    </div>
  </div>
</template>
