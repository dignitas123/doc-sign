<script setup>
import { inject } from "vue";
const emitter = inject("emitter");

const props = defineProps({
  validated: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

const emitAdd = () =>
  emitter.emit("editComponentChanged", {
    validated: props.validated,
    message: props.message,
  });
const emitClose = () => emitter.emit("editComponentClosed");
</script>

<template>
  <div class="row mt-small justify-between">
    <div class="col">
      <q-btn
        class="no-shadow"
        unelevated
        color="accent"
        style="width: 100%"
        @click="emitAdd"
      >
        Save Changes
      </q-btn>
    </div>
    <div class="col- ml-small">
      <q-btn
        class="no-shadow"
        unelevated
        outline
        icon="close"
        color="primary"
        @click="emitClose"
      />
    </div>
  </div>
</template>
