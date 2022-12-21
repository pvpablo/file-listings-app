<template>
  <v-app>
    <v-app-bar color="primary" max-height="60">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>File Listing App</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
          v-if="!isAuthUser"
          @click="login"
          color="secondary"
          dark
          rounded
          class="ml-5 primary--text"
        >
          <v-icon right color="secondary" class="pr-3">mdi-account</v-icon>
          Login
        </v-btn>
        <v-menu v-if="isAuthUser" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              color="secondary"
              dark
              v-bind="props"
              class="ml-5 primary--text"
            >
              <v-icon right color="secondary" class="pr-3">mdi-account</v-icon>
              {{ shortDisplayName }}
              <v-icon right color="secondary" class="pr-3 pl-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div class="sidebar-header pa-5">
        <h1>File Listings App</h1>
      </div>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="$router.push(item.view)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" class="mr-2"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { auth } from "@/main"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  methods: {
    login() {
      const provider = new GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      provider.setCustomParameters({
        prompt: "select_account",
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
          this.isAuthUser = true;
          this.displayName = result.user.displayName;
        })
        .catch((err) => new Error(err));
    },
    logout() {
      auth
        .signOut()
        .then(() => {
          this.isAuthUser = false;
          this.displayName = "";
        })
        .catch((err) => new Error(err));
    },
  },
  computed: {
    shortDisplayName() {
      return this.displayName.substr(0, this.displayName.indexOf(" "));
    }
  },
  data: () => ({
    drawer: false,
    isAuthUser: auth.currentUser,
    displayName: auth.currentUser
      ? auth.currentUser.displayName
      : "",
    // uid: auth.currentUser.uid,
    items: [
      { title: 'Home', icon: 'mdi-home', view: '/' },
      { title: 'List Files', icon: 'mdi-note', view: '/list' },
    ],
  }),
}
</script>