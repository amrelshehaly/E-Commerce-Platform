import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'



const SignIn = () =>{

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        // console.log(response);
    }

    return(
        <div>
            <button onClick={logGoogleUser}>
                sign in with google
            </button>
        </div>
    )
}

export default SignIn