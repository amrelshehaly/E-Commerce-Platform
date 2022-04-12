import {createContext, useState, useEffect} from 'react'


const RemoveCartItem = (cartItems, productToRemove) => {
    const existingCartItem =  cartItems.find((cartitem) =>cartitem.id === productToRemove.id)

    if(existingCartItem.quantity > 1){
        return cartItems.map((item)=> item.id === productToRemove.id? 
         {...item, quantity:item.quantity - 1}:
         item
        )
    }
    

    return cartItems.filter((item) => item.id !== productToRemove.id)
}

const deleteWholeItemInCart = (cartItems, productToRemove) =>{
    return cartItems.filter((items) => items.id !==  productToRemove.id)
}

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItem =  cartItems.find((cartitem) =>cartitem.id === productToAdd.id)

    if(existingCartItem){
        return cartItems.map((item)=> item.id === productToAdd.id? 
         {...item, quantity:item.quantity +1}:
         item
        )
    }
    

    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen:true,
    setIsCartOpen: () => {},
    cartItems : [],
    addItemToCart: () =>{},
    cartCount: 0,
    removeItemCart : () => {},
    deleteWholeItem: () => {},
    cartTotal : 0
})

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount , setCartCount] = useState(0);
    const [cartTotal, setCartTotal]  = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartitem) => total + cartitem.quantity  , 0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartitem) => total + (cartitem.quantity * cartitem.price)  , 0)
        setCartTotal(newCartTotal)
    },[cartItems])
    
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemCart = (productToRemove) =>{
        setCartItems(RemoveCartItem(cartItems, productToRemove))
    }

    const deleteWholeItem = (productToRemove) => {
        setCartItems(deleteWholeItemInCart(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemCart,deleteWholeItem, cartTotal}

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}