import {createAction} from '../../utils/reducer/reducer.utils'
import {CART_ACTION_TYPES} from './cart.types'

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

export const addItemToCart = (cartItems ,productToAdd) =>{
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems)
}

export const removeItemCart = (cartItems,productToRemove) =>{
    const newCartItems = RemoveCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems)
}

export const deleteWholeItem = (cartItems, productToRemove) => {
    const newCartItems = deleteWholeItemInCart(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM,newCartItems)
}

export const setIsCartOpen = (boolean) =>{
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
}