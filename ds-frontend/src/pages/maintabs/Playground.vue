<script setup>
import { ref } from 'vue';
import { useQuasar, QUploader } from 'quasar';
import {
  generateKey,
  encrypt,
  decrypt,
  createMessage,
  readKey,
  readMessage,
} from 'openpgp';
import MainLayout from 'src/layouts/MainLayout.vue';
import Tabs from '../main-tabs.vue';

const $q = useQuasar();

const noFileUploaded = ref(true);

async function blobToUint8Array(blob) {
  const response = await new Response(blob).arrayBuffer();
  return new Uint8Array(response);
}

function onRejected(rejectedEntries) {
  console.log('rejected entry', rejectedEntries);

  if (Array.isArray(rejectedEntries)) {
    let reason = '';
    if (rejectedEntries[0].failedPropValidation === 'max-file-size')
      reason = 'File too large (max size: 10mb)';
    $q.notify({
      type: 'negative',
      message: `${
        rejectedEntries.length
      } file(s) did not pass validation constraints. ${
        reason ? 'Reason: ' + reason + '.' : ''
      }`,
    });
  }
}

// Test openpgp generate function
async function encryptInputFile(file) {
  await generate()
    .then((result) => {
      const { privateKey, publicKey, revocationCertificate } = result;
      console.log(privateKey, publicKey, revocationCertificate);

      encryptDecryptFile(publicKey, file)
        .then((result) => {
          console.log('encryptDecryptResult', result);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

async function generate() {
  return await generateKey({
    type: 'ecc', // Type of the key, defaults to ECC
    curve: 'curve25519', // ECC curve name, defaults to curve25519
    userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
    passphrase: 'super long and hard to guess secret', // protects the private key
    format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
  });
}

async function encryptDecryptFile(publicKeyArmored, file) {
  const passphrase = 'secret stuff'; // Password that private key is encrypted with

  const publicKey = await readKey({ armoredKey: publicKeyArmored });

  // const privateKey = await decryptKey({
  //     privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
  //     passphrase
  // })

  const encrypted = await encrypt({
    message: await createMessage({ binary: file }), // input as Message object
    encryptionKeys: publicKey,
    // signingKeys: privateKey, // optional
    passwords: ['secret stuff'],
    format: 'binary',
  });
  console.log('encrypted', encrypted); // ReadableStream containing '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

  const message = await readMessage({
    binaryMessage: encrypted, // parse armored message
  });

  const decrypted = await decrypt({
    message,
    verificationKeys: publicKey, // optional
    // decryptionKeys: privateKey
    passwords: [passphrase],
  });

  console.log('decrypted message', decrypted);
}

async function onAdded(files) {
  console.log('file added:', files[0] instanceof Blob);

  const blobUint8Array = await blobToUint8Array(files[0]);
  await encryptInputFile(blobUint8Array);
  noFileUploaded.value = false;
}

function onRemoved() {
  noFileUploaded.value = true;
}

const fileUploader = (ref < QUploader) | (undefined > undefined);
function triggerPickFiles() {
  fileUploader.value?.pickFiles();
}
</script>

<template>
  <MainLayout>
    <q-page class="row items-center justify-evenly">
      <q-uploader
        label="UPLOAD YOUR DOCUMENT"
        ref="fileUploader"
        style="max-width: 300px"
        accept=".jpg, .jpeg, .png, .pdf"
        max-file-size="10000000"
        @rejected="onRejected"
        @added="onAdded"
        @removed="onRemoved"
      >
        <template v-if="noFileUploaded" #list>
          <div class="upload-info" @click="triggerPickFiles">
            <div class="text-info absolute-center">
              Drag and Drop file here.
            </div>
          </div>
        </template>
      </q-uploader>
    </q-page>
    <template #secondToolbar>
      <Tabs />
    </template>
  </MainLayout>
</template>

<style lang="scss" scoped>
.upload-info {
  min-height: 60px;
  &:hover {
    cursor: pointer;
  }
}
</style>
