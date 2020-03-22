

import firebase from 'firebase'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import router from './router/index'


import { store } from './store/store'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

let app = ''
// This is a git test.
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store: store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (firebaseUser) {
    store.dispatch('autoSignIn', firebaseUser)
  } else {
    store.dispatch('userSignOut', firebaseUser)
  }
});

// *******

// // src/main.js
// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';

// Vue.config.productionTip = false

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
