import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up/sign-up-form.component'

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
            <SignUpForm />
        </div>
    )
}

export default SignIn