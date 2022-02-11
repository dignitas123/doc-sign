<template>
  <q-page class="row items-center justify-evenly">
    <q-uploader
      label="UPLOAD YOUR DOCUMENT"
      ref="fileUploader"
      style="max-width: 300px"
      accept=".jpg, .png, .pdf"
      max-file-size="10000000"
      @rejected="onRejected"
      @added="onAdded"
      @removed="onRemoved"
    >
      <template v-if="noFileUploaded" #list>
        <div class="text-info absolute-center">
          Drag and Drop<br />.png, .jpg, .pdf
        </div>
      </template>
    </q-uploader>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { RejectedFile } from "./Documents.model";
import { generateKey, encrypt, decrypt, createMessage, readKey, readMessage } from "openpgp";
// import { createReadStream } from "fs";

export default defineComponent({
  name: "PageIndex",
  components: {},
  setup() {
    const $q = useQuasar();

    const noFileUploaded = ref(true);

    const fileUploader = ref<HTMLElement | null>(null);

    function onRejected(rejectedEntries: RejectedFile[]) {
      console.log("rejected entry", rejectedEntries);

      // https://quasar.dev/quasar-plugins/notify#Installation
      if (Array.isArray(rejectedEntries)) {
        let reason = "";
        if (rejectedEntries[0].failedPropValidation === "max-file-size")
          reason = "File too large (max size: 10mb)";
        $q.notify({
          type: "negative",
          message: `${
            rejectedEntries.length
          } file(s) did not pass validation constraints. ${
            reason ? "Reason: " + reason + "." : ""
          }`,
        });
      }
    }

    // Test openpgp generate function
    async function encryptInputFile(file: string) {
      await generate()
        .then((result) => {
          const { privateKey, publicKey, revocationCertificate } = result;
          console.log(privateKey, publicKey, revocationCertificate);

          encryptDecryptFile(publicKey, file).then((result) => {
            console.log("encryptDecryptResult", result);
          }).catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function generate() {
      return await generateKey({
          type: "ecc", // Type of the key, defaults to ECC
          curve: "curve25519", // ECC curve name, defaults to curve25519
          userIDs: [{ name: "Jon Smith", email: "jon@example.com" }], // you can pass multiple user IDs
          passphrase: "super long and hard to guess secret", // protects the private key
          format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });

      // console.log(privateKey); // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      // console.log(publicKey); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
      // console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    }

    // async function encryptFile(pathToFile: string = "TestPng.png") {
    //   const readableStream = createReadStream(pathToFile);

    //   const message = await createMessage({ binary: readableStream });
    //   const encrypted = await encrypt({
    //     message, // input as Message object
    //     passwords: ["secret stuff"], // multiple passwords possible
    //     format: "binary", // don't ASCII armor (for Uint8Array output)
    //   });
    //   console.log(encrypted); // raw encrypted packets as ReadableStream<Uint8Array>

    //   // Either pipe the above stream somewhere, pass it to another function,
    //   // or read it manually as follows:
    //   for await (const chunk of encrypted) {
    //     console.log("new chunk:", chunk); // Uint8Array
    //   }
    //   // const encrypted = await encrypt({
    //   //   message: message.fromText(createReadStream("dataset-1mill.json")),
    //   //   publicKeys: (await key.readArmored(publicKeyArmored)).keys,
    //   // });

    //   // let readStream = encrypted.data;
    //   // let writeStream = createWriteStream("encrypted-dataset.txt", { flags: "a" });
    //   // readStream.pipe(writeStream);
    //   // readStream.on("end", () => console.log("done!"));
    // }

    // config.allowUnauthenticatedStream = true;

    async function encryptDecryptFile(publicKeyArmored: string, file: string) {
      const passphrase = 'secret stuff'; // Password that private key is encrypted with

      const publicKey = await readKey({ armoredKey: publicKeyArmored });

      // const privateKey = await decryptKey({
      //     privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
      //     passphrase
      // });

      // const stream = inp.files[0].stream();
      // const reader = stream.getReader();
      // while( true ) {
      //   const { done, value } = await reader.read();
      //   if( done ) { break; }
      //   console.log("value", value)
      // }

      const encrypted = await encrypt({
          message: await createMessage({ binary: file }), // input as Message object
          encryptionKeys: publicKey,
          // signingKeys: privateKey, // optional
          passwords: ['secret stuff'],
          format: "binary"
      });
      console.log("encrypted", encrypted); // ReadableStream containing '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

      const message = await readMessage({
          binaryMessage: encrypted // parse armored message
      });

      const decrypted = await decrypt({
          message,
          verificationKeys: publicKey, // optional
          // decryptionKeys: privateKey
          passwords: [passphrase]
      });

      console.log("decrypted", decrypted)
      // const chunks = [];
      // for await (const chunk of decrypted.data) {
      //     chunks.push(chunk);
      // }

      // const plaintext = chunks.join('');
      // console.log(new Blob(decrypted))
      // const privateKey = await readKey({armoredKey: privateKeyArmored})
      // await privateKey.decrypt(passphrase);

      // const decrypted = await decrypt({
      //   message: await message.readArmored(
      //     createReadStream("encrypted-dataset.txt")
      //   ),
      //   privateKeys: [privateKey],
      // });

      // let readStream = decrypted.data;
      // let writeStream = fs.createWriteStream("decrypted-dataset.json", {
      //   flags: "a",
      // });
      // readStream.pipe(writeStream);
      // readStream.on("end", () => console.log("done!"));
    }

    const reader = new FileReader();
        reader.onload = async () => {
        // console.log(reader.result);
        if(typeof(reader.result) === 'string')
          await encryptInputFile(reader.result);
      }

    function onAdded(files: File[]) {
      
      reader.readAsText(files[0]);
      console.log("file added:", files[0] instanceof Blob);

      noFileUploaded.value = false;
    }

    function onRemoved() {
      noFileUploaded.value = true;
    }

    return { noFileUploaded, onRejected, onAdded, onRemoved, fileUploader };
  },
});
</script>
