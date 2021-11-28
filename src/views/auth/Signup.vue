<template>
  <div class="signup container">
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <h2>Signup</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-img
              lazy-src="@/assets/director-cup-logos.png"
              src="@/assets/director-cup-logos.png"
            ></v-img>
          </v-col>
        </v-row>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Email"
              type="email"
              v-model="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="UserName"
              type="text"
              v-model="userName"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Name"
              type="text"
              v-model="name"
            ></v-text-field>
          </v-flex>
          <v-col align="center" justify="center">
            <h2>House:</h2>
            <v-chip-group
              :active-class="chipColor"
              column
              align="center"
              justify="center"
            >
              <v-chip
                v-for="(item, index) in houses"
                :key="index"
                @click="myHouse = item"
              >
                {{ item }}
              </v-chip>
            </v-chip-group>
            <v-col
              align="center"
              justify="center"
              v-if="myHouse == 'Questions With Attitude'"
            >
              <v-img
                lazy-src="@/assets/questionswithattitude.png"
                max-height="100"
                max-width="100"
                src="@/assets/questionswithattitude.png"
              ></v-img>
            </v-col>
            <v-col align="center" justify="center" v-if="myHouse == 'Code 390'">
              <v-img
                lazy-src="@/assets/code390.png"
                max-height="100"
                max-width="100"
                src="@/assets/code390.png"
              ></v-img>
            </v-col>

            <v-col
              align="center"
              justify="center"
              v-if="myHouse == 'The People\'s Team'"
            >
              <v-img
                lazy-src="@/assets/peoplesteam.png"
                max-height="100"
                max-width="100"
                src="@/assets/peoplesteam.png"
              ></v-img>
            </v-col>
            <v-col
              align="center"
              justify="center"
              v-if="myHouse == 'The Unique Concepts'"
            >
              <v-img
                lazy-src="@/assets/uniqueconcepts.png"
                max-height="100"
                max-width="100"
                src="@/assets/uniqueconcepts.png"
              ></v-img>
            </v-col>
          </v-col>
          <v-flex xs12>
            <p class="red--text feedback" v-if="feedback">{{ feedback }}</p>
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
      userNameTaken: false,
      houses: [
        "Questions With Attitude",
        "Code 390",
        "The People's Team",
        "The Unique Concepts",
      ],
      myHouse: "not set",
      imageSRC: "src/assets/director-cup-logos.png",
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
          lower: true,
        });

        // check is the username is taken
        var docRef = firebase
          .firestore()
          .collection("User_Names")
          .doc(this.slug);
        docRef
          .get()
          .then((doc) => {
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
                .catch((error) =>
                  // Handle Errors here.
                  {
                    return (this.feedback = error.message);
                  }
                )
                .then((cred) => {
                  cred.user.updateProfile({
                    displayName: this.slug,
                    email: this.email,
                  });
                  return firebase
                    .firestore()
                    .collection("Users")
                    .doc(cred.user.uid)
                    .set({
                      user_name: this.slug,
                      email: cred.user.email,
                      id: cred.user.uid,
                      name: this.name,
                      house: this.myHouse,
                    });
                })
                .then(() => {
                  return firebase
                    .firestore()
                    .collection("User_Names")
                    .doc(this.slug)
                    .set({
                      user_name: this.slug,
                    });
                })
                .then(() => {
                  this.$router.push({
                    name: "Home",
                    // params: { uid: firebase.auth().currentUser.uid }
                  });
                });
            }
          });
      } // end docExisits if
    }, // form validate if
  }, // end signup.

  computed: {
    chipColor() {
      switch (this.myHouse) {
        case "Questions With Attitude":
          return "code390--text";
        case "Code 390":
          return "code390--text";
        case "The Peoples Team":
          return "code390--text";
        case "The Unique Concepts":
          return "code390--text";
        default:
          return "red--text";
      }
    },
  },
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
