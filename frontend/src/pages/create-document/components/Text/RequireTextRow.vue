<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  modelValue: Object,
});

const editorRef = ref();
watch(editorRef, () => {
  editorRef.value.focus();
})

defineEmits(["update:modelValue"]);

const val = ref(props.modelValue);

const toolbarTextDesktopItems = ref([
  ["link"],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
  ],
  ["unordered", "ordered", "outdent", "indent"],
]);

const editorToolBarItems = computed(() => {
  return reactive([
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: "only-icons",
        options: ["left", "center", "right", "justify"],
      },
    ],
    ["bold", "italic", "underline"],
    ...($q.screen.lt.sm ? [] : toolbarTextDesktopItems.value),
  ]);
});
</script>

<template>
  <div class="row items-center">
    <div class="col">
      <q-editor ref="editorRef" v-model="val.text" :toolbar="editorToolBarItems" />
    </div>
  </div>
  <AddButton />
</template>
