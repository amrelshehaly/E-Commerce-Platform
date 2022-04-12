
import {useContext} from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../contexts/cart.context'

const CartDropdwon = () =>{


    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const GoToCheckoutHandler = () =>{
        navigate('/checkout')
    }

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item,idx)=> <CartItem key={idx} cartItem={item} />)}
            </div>
            <Button onClick={GoToCheckoutHandler}>
                Go To Check 
            </Button>
        </div>
    )
}

export default CartDropdwon