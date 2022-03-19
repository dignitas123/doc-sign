<script setup>
const emit = defineEmits(["buttonClicked"]);

const emitClick = () => emit("buttonClicked");
</script>

<template>
<div class="row justify-center">
    <div class="col-12">
        <q-btn
        class="no-shadow"
        unelevated
        color="accent"
        style="width: 100%"
        @click="emitClick"
        >
        Add
        </q-btn>
    </div>
</div>
</template>