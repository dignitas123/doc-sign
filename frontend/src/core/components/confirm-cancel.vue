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
  <div class="row justify-between q-mt-xs">
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
    <div class="col- q-ml-xs">
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
