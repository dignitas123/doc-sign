<script setup>
defineProps({
  confirmText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div class="row justify-between">
    <div class="col">
      <q-btn
        class="no-shadow"
        unelevated
        color="accent"
        style="width: 100%"
        @click="emit('confirm')"
      >
        {{ confirmText }}
      </q-btn>
    </div>
    <div class="col- ml-small">
      <q-btn
        class="no-shadow"
        unelevated
        outline
        icon="close"
        color="primary"
        @click="emit('cancel')"
      />
    </div>
  </div>
</template>
