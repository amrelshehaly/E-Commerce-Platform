import {useEffect} from  'react'
import {useDispatch} from 'react-redux'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'
import {Routes, Route} from 'react-router-dom'

import {onAuthStateChangedListner, createUserDocumentFromAuth} from './utils/firebase/firebase.utils'
import {setCurrentUser} from './store/user/user.action'

import Shop from './routes/shop/shop.component'



const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const unSubscribe = onAuthStateChangedListner((user)=>{
        if(user){
          createUserDocumentFromAuth(user)
        }
        
         dispatch(setCurrentUser(user))
     })

    return unSubscribe
  },[])

  return(
    <Routes>
      <Route  path="/" element={<Navigation />}>
        <Route index  element={<Home />} />
        <Route  path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
  
}

export default App;
