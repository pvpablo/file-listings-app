<template>
  <v-container>
    <v-row class="pr-3">
      <v-col cols="12" sm="6" class="mt-3">
      <span class="ml-3 text-h6">Upload File:</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <v-text-field 
            label="File Name"
            prepend-icon="mdi-note"
            v-model="form.fileName"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <v-file-input
            accept="image/*"
            label="File input"
            v-model="form.files"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex flex-wrap">
            <v-btn
                depressed
                color="primary"
                @click="saveFile"
            >
                Submit
            </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { storage, firestore, auth } from "@/main"

export default {
  name: 'home-view',
  data: () => ({
    form: {
        fileName: '',
        files: [],
    }
  }),
  methods: {
    saveFile() {
        const storageRef = ref(storage, this.form.fileName);
        uploadBytes(storageRef, this.form.files[0]).then((snapshot) => {
            const entry = {
                fileName: this.form.fileName,
                bucket: snapshot.ref.bucket,
                path: snapshot.ref.fullPath,
                owner: auth.currentUser.uid,
            }
            addDoc(collection(firestore, "files"), entry).then((snapshot) => {
                console.log("Saved Document " + snapshot)
                this.form.fileName = ''
                this.form.files = []
            })
        })
    }
  }
}
</script>