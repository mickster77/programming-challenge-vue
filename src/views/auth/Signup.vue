<template>
  <div class="signup container">
    <v-form>
      <v-container>
        <span>
          <h2>Signup</h2>
        </span>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="Email" type="email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="UserName" type="text" v-model="userName"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Name" type="text" v-model="name"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <p class="red--text feedback" v-if="feedback">{{feedback}}</p>
          </v-flex>

          <v-flex xs12>
            <v-btn @click="signup" color="primary" class="center">Submit</v-btn>
          </v-flex>
          <v-flex xs12 class="my-0">
            <p>
              Already have an account? Log in
              <a href="/login">here</a>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import slugify from "slugify";
import firebase from "firebase";
// import { log } from "util";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      userName: null,
      feedback: null,
      slug: null,
      name: null,
      userNameTaken: false
    };
  },
  methods: {
    signup() {
      if (this.userName && this.email && this.password) {
        //verify all fields are filled out
        this.feedback = null;

        // Generate slug based on userName
        this.slug = slugify(this.userName, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        // check is the username is taken
        var docRef = firebase
          .firestore()
          .collection("User_Names")
          .doc(this.slug);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              alert("this username is taken");
              this.userNameTaken = true;
            } else {
              // doc.data() will be undefined in this case
              alert("This username is available!!");
              this.userNameTaken = false;
            }
          })
          .then(() => {
            if (!this.userNameTaken) {
              // Establish user
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .catch(error =>
                  // Handle Errors here.
                  {
                    return (this.feedback = error.message);
                  }
                )
                .then(cred => {
                  cred.user.updateProfile({
                    displayName: this.slug,
                    email: this.email
                  });
                  return firebase
                    .firestore()
                    .collection("Users")
                    .doc(cred.user.uid)
                    .set({
                      user_name: this.slug,
                      email: cred.user.email,
                      id: cred.user.uid,
                      name: this.name
                    });
                })
                .then(() => {
                  return firebase
                    .firestore()
                    .collection("User_Names")
                    .doc(this.slug)
                    .set({
                      user_name: this.slug
                    });
                })
                .then(() => {
                  this.$router.push({
                    name: "Home"
                    // params: { uid: firebase.auth().currentUser.uid }
                  });
                });
            }
          });
      } // end docExisits if
    } // form validate if
  } // end signup.
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
.feedback {
  text-align: center;
}
</style>
