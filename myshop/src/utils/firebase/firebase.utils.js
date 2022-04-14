import {initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


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

const Googleprovider = new GoogleAuthProvider()
Googleprovider.setCustomParameters({
    prompt : "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, Googleprovider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, Googleprovider)

export const db = getFirestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db);

    objectsToAdd.forEach((ele) =>{
        const docRef = doc(collectionRef, ele.title.toLowerCase())
        batch.set(docRef, ele)
    })

    await batch.commit()
}

export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshots = await getDocs(q)
    const categoryMap = querySnapshots.docs.reduce((acc, docSnapshot) =>{
        const {title,items} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return categoryMap
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {})=> {


    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)

    // console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("Error creating a user",error)
        }
    }

    return userDocRef
}       

export const CreateAccountWIthGoogleEmailandPassword = async ({email,Password}) => {

    console.log(email,Password)

    if(!email || !Password) return;

    return await createUserWithEmailAndPassword(auth,email, Password)
}


export const siginAuthUserWithEmailandPassword = async ({email,Password}) => {

    console.log(email,Password)

    if(!email || !Password) return;

    return await signInWithEmailAndPassword(auth,email, Password)
}


export const SignOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth,callback)
}