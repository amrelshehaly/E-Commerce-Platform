import {useState} from 'react'
import {CreateAccountWIthGoogleEmailandPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

const formFields = {
    displayName: '',
    email:'',
    Password: '',
    ConfirmPassword: ''
}

const SignUpForm = () =>{

   const [formField, setFormField] = useState(formFields)
   const {
       displayName,
       email,
       Password,
       ConfirmPassword
   } = formField

   const resetFormField = () => {
     setFormField(formFields)
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
        if(Password !== ConfirmPassword){
            alert("Password does not match")
            return;
        }

        try {
            const {user} =  await CreateAccountWIthGoogleEmailandPassword(formField)
            const response = await createUserDocumentFromAuth(user, {displayName})
            await resetFormField()
            
        } catch (error) {
            if(error.code  === 'auth/email-already-in-use'){
                alert("The user is already registered")
            }
            console.log(error)
        } 
        
   }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" onChange={handleChange} type="text" required name="displayName" value={displayName} />
                <FormInput label="Email" onChange={handleChange} type="email" required name="email" value={email} />
                <FormInput label="Password" onChange={handleChange} type="password" required name="Password" value={Password} />
                <FormInput label="Confirm Password" onChange={handleChange} type="password" required name="ConfirmPassword" value={ConfirmPassword} />

                <Button buttonType="inverted" type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm