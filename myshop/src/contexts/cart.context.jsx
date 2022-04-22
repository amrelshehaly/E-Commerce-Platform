import {createContext, useReducer} from 'react'
import {createAction} from '../utils/reducer/reducer.utils'


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

const CART_ACTION_TYPES = {
    SET_CART_ITEM: 'SET_CART_ITEM',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'

}

const INTIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    cartCount: 0,
    cartTotal: 0
}

const  cartReducer = (state, action) =>{

    const {type, payload} = action;

    switch (type) {
        case 'SET_CART_ITEM':
            return{
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return{
                ...state,
                isCartOpen:payload
            }    
        default:
            throw new Error(`Unhandled type ${type} in cart Reducer`)
    }
}

export const CartProvider = ({children}) =>{
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INTIAL_STATE)

    const updateCartItemsReducer = (newCartItem ) =>{

        const newCartCount = newCartItem.reduce((total, cartitem) => total + cartitem.quantity  , 0)

        const newCartTotal = newCartItem.reduce((total, cartitem) => total + (cartitem.quantity * cartitem.price)  , 0)

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEM,{
                cartItems: newCartItem ,
                cartCount: newCartCount ,
                cartTotal: newCartTotal
            })
           )
    }

    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemCart = (productToRemove) =>{
        const newCartItems = RemoveCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const deleteWholeItem = (productToRemove) => {
        const newCartItems = deleteWholeItemInCart(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (boolValue) =>{
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:boolValue})
    }

    const value = {isCartOpen, setIsCartOpen , addItemToCart, cartItems, cartCount, removeItemCart,deleteWholeItem, cartTotal}

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}