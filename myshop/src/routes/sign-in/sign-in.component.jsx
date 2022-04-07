import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils'


const SignIn = () =>{

    const logGoogleUser = async () =>{
        const response = await signInWithGooglePopup()
        console.log(response);
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