import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import {useContext, useState} from 'react'
import {CartContext} from '../../contexts/cart.context'

const CartIcon = () =>{

    const {isCartOpen ,setIsCartOpen, cartItems, cartCount} = useContext(CartContext)

    const [cartItemsNo, setCartItemNo] = useState(0);

    const toogleIsCartToggle = () =>{
        setIsCartOpen(!isCartOpen)
    }

    return(
        <div className="cart-icon-container" onClick={toogleIsCartToggle}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon