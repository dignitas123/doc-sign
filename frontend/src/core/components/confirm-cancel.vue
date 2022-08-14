<script setup>
defineProps({
  confirmText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="row justify-between mt-small">
    <div class="col">
      <q-btn
        unelevated
        rounded
        color="accent"
        style="width: 100%"
        @click="emit('confirm')"
      >
        {{ confirmText }}
      </q-btn>
    </div>
    <div class="col- ml-small">
      <q-btn
        unelevated
        rounded
        outline
        icon="close"
        color="primary"
        @click="emit('cancel')"
      />
    </div>
  </div>
</template>
