<script setup>
import { ref, watch, reactive, computed, inject, onMounted } from "vue";
import InputFieldRow from "./InputFieldRow.vue";
import RequireInputFieldRow from "./RequireInputFieldRow.vue";
import SaveChangesButton from "../../../../core/components/SaveChangesButton.vue";
import { RequireField } from "../../Index.model";

const emitter = inject("emitter");

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  preview: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Input Label (Name, Address, ...)",
  },
  editActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const nameInputRef = ref(null);

onMounted(() => {
  if (nameInputRef.value) {
    nameInputRef.value.focus();
  }
  startValue.value = { ...val.value };
});

function getModelValue() {
  return (
    props.modelValue ??
    reactive({
      name: "",
      inputFieldAllowed: reactive({
        Text: true,
        Numbers: false,
        SpecialCharacters: false,
      }),
      textAreaSize: "small_input_field",
      maxLength: 64,
    })
  );
}

const val = ref(getModelValue());
const startValue = ref();

const allFalse = (arr) => arr.every((v) => v === false);

watch(val.value.inputFieldAllowed, () => {
  if (allFalse(Object.values(val.value.inputFieldAllowed).map((val) => val))) {
    val.value.inputFieldAllowed.Text = true;
  }
});

watch(
  () => val.value.textAreaSize,
  (textAreaSize) => {
    if (textAreaSize === "small_input_field" || textAreaSize === "textarea") {
      const currentName = val.value.name;
      if (currentName.length > 26) {
        val.value.name = currentName.slice(0, val.value.name.length - 26);
      }
    }
  }
);

const inputFieldNameFocused = ref(false);
function focusInputFieldName() {
  inputFieldNameFocused.value = true;
}
function unfocusInputFieldName() {
  inputFieldNameFocused.value = false;
}

const validated = computed(() => {
  return !!val.value.name.length;
});

const validationMessage = computed(() => {
  return validated.value ? "" : "Name of Input Field can't be empty.";
});

const editActiveValue = ref(props.editActive);

function setEditActive() {
  editActiveValue.value = true;
}

emitter.on("editComponentChanged", (data) => {
  if (data.validated) {
    editActiveValue.value = false;
  }
});

emitter.on("editComponentClosed", () => {
  if (editActiveValue.value) {
    val.value = reactive(startValue);
    editActiveValue.value = false;
  }
});

function inputEnterKeyFired() {
  emitter.emit("peComponentAdded", {
    validated: validated.value,
    message: validationMessage.value,
  });
}

function deleteInputFieldRow() {
  emitter.emit("peComponentDeleted", {
    type: RequireField.Input,
    name: val.value.name,
  });
}

const deleteConfirm = ref(false);
</script>

<template>
  <template v-if="preview">
    <div class="row justify-end">
      <q-btn dense flat icon="edit" size="xs" @click="setEditActive" />
      <q-btn dense flat icon="content_copy" size="xs" />
      <q-btn dense flat icon="delete" size="xs" @click="deleteConfirm = true" />
    </div>
    <div v-if="editActiveValue" class="dotted-border">
      <RequireInputFieldRow v-model="val" editActive />
    </div>
    <InputFieldRow v-else v-model="val" />
  </template>
  <template v-else>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <q-input
          ref="nameInputRef"
          v-model="val.name"
          outlined
          dense
          :placeholder="inputFieldNameFocused ? '' : placeholder"
          @focus="focusInputFieldName"
          @blur="unfocusInputFieldName"
          @keyup.enter="inputEnterKeyFired"
          :maxlength="
            val.textAreaSize === 'big_input_field'
              ? val.maxLength
              : val.textAreaSize === 'small_input_field'
              ? 26
              : 26
          "
        />
      </div>
      <div class="col-xs-12 col-sm-6 text-center">
        <q-checkbox
          v-model="val.inputFieldAllowed.Text"
          label="A,b,c"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow alphabetical letters.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.Numbers"
          label="0,1,2"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow numbers.</q-tooltip
          ></q-checkbox
        >
        <q-checkbox
          v-model="val.inputFieldAllowed.SpecialCharacters"
          label="*,$,%"
          color="primary"
          ><q-tooltip :delay="750" :offset="[0, 10]"
            >Allow special characters.</q-tooltip
          ></q-checkbox
        >
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 text-center">
        <q-radio
          v-model="val.textAreaSize"
          val="small_input_field"
          label="Small Input Field"
        />
        <q-radio
          v-model="val.textAreaSize"
          val="big_input_field"
          label="Big Input Field"
        />
        <q-radio v-model="val.textAreaSize" val="textarea" label="Textarea" />
      </div>
    </div>
    <template v-if="val.name">
      <HyphenText class="mt-small mb-big">Preview</HyphenText>
      <InputFieldRow v-model="val" preview />
    </template>
    <SaveChangesButton
      v-if="editActive"
      :validated="validated"
      :message="validationMessage"
    />
    <AddButton v-else :validated="validated" :message="validationMessage" />
  </template>
  <q-dialog v-model="deleteConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to delete this row?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="primary"
          v-close-popup
          @click="deleteInputFieldRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
