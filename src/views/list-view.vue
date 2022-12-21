<template>
  <v-container>
    <v-row class="pr-3">
      <v-col cols="12" sm="6" class="mt-3">
      <span class="ml-3 text-h6">List Files</span>
      </v-col>
    </v-row>
    <v-row>
      <v-table>
        <thead>
            <tr>
                <th class="text-left">
                ID
                </th>
                <th class="text-left">
                File Name
                </th>
                <th class="text-left">
                Created At
                </th>
                <th class="text-left">
                Path
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in files"
                :key="item.name"
            >
                <td>{{ item.id }}</td>
                <td>{{ item.fileName }}</td>
                <td>{{ item.createdAt }}</td>
                <td><v-btn small color="primary" 
                        :href="item.url" 
                        target="_blank">
                        Download
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    </v-row>
  </v-container>
</template>

<script>
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import { auth, firestore, storage } from "@/main"

export default {
  name: 'list-view',
  created : function() {
    const q = query(collection(firestore, "files"), where("owner", "==", auth.currentUser.uid))
    onSnapshot(q, querySnapshot => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            const data = doc.data()
            const storageRef = ref(storage, data.path)
            getDownloadURL(storageRef).then((url) => {
                data.url = url
                data.id = doc.id
                data.createdAt = new Date(data.createdAt.seconds *1000)
                this.files[doc.id] = data
            })
        })
    })
  },
  data: () => ({
    files: {}
  }),
//   methods: {
//     downloadFile(path) {
//         getDownloadURL(ref(storage, path))
//         .then((url) => {
//             // This can be downloaded directly:
//             const xhr = new XMLHttpRequest();
//             xhr.responseType = 'blob';
//             xhr.onload = (event) => {
//                 const blob = xhr.response;
//             };
//             xhr.open('GET', url);
//             xhr.send();
//         })
//     }
//   }
}
</script>