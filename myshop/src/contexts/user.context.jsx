import {createContext, useEffect, useReducer} from  'react'
import {onAuthStateChangedListner, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

export const userContext = createContext({
    currentUser: null,
    setCurrentUser : () => null
})


const USER_ACTION_TYPES ={
    SET_CURRENT_USER: "SET_CURRENT_USER",
}


const userReducer = (state, action) => {

    const {type, payload} = action;
    console.log(action)

    switch (type) {
        case "SET_CURRENT_USER":
            return{
                ...state,
                currentUser: payload
            }    
        default:
            throw Error (`unhandled type ${type} is userReducer`)
    }
    
}

const initialState = {
    currentUser: null
}

export const UserProvider = ({children}) => {

    // const [currentUser, setCurrentUser] = useState(null)
    const [{currentUser}, dispatch] = useReducer(userReducer, initialState)
    console.log(currentUser)

    const setCurrentUser = (user) =>{
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }


    const value = {currentUser, setCurrentUser}

    useEffect(()=>{
       const unSubscribe = onAuthStateChangedListner((user)=>{
           if(user){
             createUserDocumentFromAuth(user)
           }
           setCurrentUser(user)
        })

       return unSubscribe
    },[])

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}