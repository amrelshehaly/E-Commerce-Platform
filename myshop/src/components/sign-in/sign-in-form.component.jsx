import {useState} from 'react'
import {signInWithGooglePopup, createUserDocumentFromAuth, siginAuthUserWithEmailandPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

const formFields = {
    displayName: '',
    email:'',
    Password: '',
    ConfirmPassword: ''
}

const SignInForm = () =>{

    const [formField, setFormField] = useState(formFields)
    const {  
       email,
       Password,
    } = formField

   const resetFormField = () => {
     setFormField(formFields)
   }

   const SignInWithGoogle = async () =>{
    await signInWithGooglePopup()
    // console.log(response);
}

   const handleChange = (event) =>{
        const {name, value} = event.target
        setFormField({
            ...formField,
            [name] : value
        })
   } 

   const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
            const {user} = await siginAuthUserWithEmailandPassword(formField)
            // console.log(user)
            resetFormField()
            
        } catch (error) {
            if(error.code == "auth/wrong-password"){
                alert("Incorrect password")
            }else if(error.code == "auth/user-not-found"){
                alert("no user associated with this email")
            }
            console.log(error)
        } 
        
   }

    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" onChange={handleChange} type="email" required name="email" value={email} />
                <FormInput label="Password" onChange={handleChange} type="password" required name="Password" value={Password} />

            <div className="buttons-container">
                 <Button type="submit">
                    Sign In
                </Button>
                <Button onClick={SignInWithGoogle} buttonType="google" type="button">
                    Google Sign In
                </Button>
            </div>
               
            </form>
        </div>
    )
}

export default SignInForm