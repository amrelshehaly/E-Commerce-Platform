import {initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDrfuUdZavlGl1KhfMFTgWux5mwQo4juLA",
  authDomain: "shehaly-shop.firebaseapp.com",
  projectId: "shehaly-shop",
  storageBucket: "shehaly-shop.appspot.com",
  messagingSenderId: "340696107289",
  appId: "1:340696107289:web:d0386ebc0ed08c20759d88",
  measurementId: "G-72MTGYD5CW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt : "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)