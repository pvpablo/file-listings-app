import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import store from './plugins/store';

loadFonts()

let app

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)

export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)

auth.onAuthStateChanged(user => {
  if (user) {
    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims) {
        store.commit('updateClaims', idTokenResult.claims)
      }
    })
  } else {
    store.commit('updateClaims', {})
  }

  store.commit('updateUser', { user })

  if (!app) {
    app = createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
  }
})
