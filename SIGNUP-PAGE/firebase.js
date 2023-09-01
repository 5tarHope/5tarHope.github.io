//Importing the firebase methods
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDy9bjAorl4gdiiLAyUNN7R3TYKMIcBip8",
  authDomain: "suscity-v2.firebaseapp.com",
  projectId: "suscity-v2",
  storageBucket: "suscity-v2.appspot.com",
  messagingSenderId: "24089113336",
  appId: "1:24089113336:web:1ba2f723f9c1a6773c010d",
  measurementId: "G-6GXZJVT8CP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

//Get inputs from HTML
const submitBtn = document.querySelector("#submit_btn");
const loading = document.getElementById("loading");
const forgetBtn = document.getElementById("forget-link");
const video = document.getElementById("video");
const done = document.getElementById("done-btn");

let email;

function forgetPassword(email) {
  showLoading();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      dismissLoading();
      alert(
        "Password reset email sent! Please check your spam mail if you can't find it."
      );
    })
    .catch(() => {
      const errorCode = error.code;
      console.log(errorCode);
    });
}

function validateEmail(email) {
  const re = /\S+\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const hasNumeric = /\d/.test(password);
  const hasAlphabetical = /[a-zA-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  if (!hasNumeric) {
    return "Please include at least one numeric character in your password.";
  }
  if (!hasAlphabetical) {
    return "Please include at least one alphabetical character in your password.";
  }
  if (!hasSpecial) {
    return "Please include at least one special character in your password.";
  }
  if (!(password.length >= 6)) {
    return "Please have at least 6 characters in your password";
  }
  return "";
}

function showLoading() {
  loading.classList.add("ring");
  document.querySelector(".signup-body").classList.add("blur");
}

function dismissLoading() {
  loading.classList.remove("ring");
  document.querySelector(".signup-body").classList.remove("blur");
}

function signUp(email, password) {
  console.log("Signing In");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      var lgDate = new Date();
      update(ref(db, "users/" + user.uid), {
        last_login: lgDate,
      }).then(() => {
        get(ref(db, "users/" + user.uid), user.uid).then((snapshot) => {
          navigateGame(user.uid, snapshot.val());
        });
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/user-not-found":
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              var lgDate = new Date();
              const defaultUser = {
                last_login: lgDate,
                email: email,
                password: password,
              };
              function showTutorial() {
                video.classList.add("visible");
                done.classList.add("visible");
              }
              set(ref(db, "users/" + user.uid), defaultUser).then(() => {
                if (confirm("Do you want a tutorial?")) {
                  showTutorial();
                  done.onclick = () => {
                    video.classList.remove("visible");
                    done.classList.remove("visible");
                    showLoading();
                    navigateGame(user.uid, defaultUser);
                  };
                } else {
                  navigateGame(user.uid, defaultUser);
                }
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              switch (errorCode) {
                case "auth/invalid-email":
                  alert("Please enter a valid email.");
                  break;
                case "auth/weak-password":
                  alert(
                    "Please enter a stronger password, with a minimum of 6 characters."
                  );
                  break;
                default:
                  alert("Please enter a valid email and password.");
              }
              console.log(errorMessage);
            });
          break;
        case "auth/wrong-password":
          alert("Your Password is wrong.");
          dismissLoading();
          break;
      }
      console.log(errorCode);
    });
}

function navigateGame(uid, snapshot) {
  console.log("Start Saving");
  localStorage.setItem("UID", uid);
  // localStorage.setItem("user", JSON.stringify(snapshot));
  console.log("End Saving");
  if (localStorage.getItem("UID") == uid) {
    console.log("Going to game");
    window.location.pathname = "/GAME-PAGE/main.html";
  }
}

// MAIN CODE
if (window.location.pathname == "/SIGNUP-PAGE/signup.html") {
  forgetBtn.addEventListener("click", function () {
    email = window.prompt(
      "Please enter an email for password recovery.",
      "xxx@gmail.com"
    );

    while (!validateEmail(email)) {
      email = window.prompt(
        "That was not a valid email, please try again. ",
        "xxx@gmail.com"
      );
    }
    forgetPassword(email);
  });

  submitBtn.addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // localStorage.setItem("URL", "https://sus-city.github.io");

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      alert(passwordValidationMessage);
      return;
    }
    signUp(email, password);
  });
}
