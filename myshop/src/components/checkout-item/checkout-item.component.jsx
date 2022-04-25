import './checkout-item.styles.scss'

import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart, removeItemCart, deleteWholeItem} from '../../store/cart/cart.action'
import {selectCartItems} from '../../store/cart/cart.selector'

const CheckoutItem = ({cartItem}) =>{

    const CartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();

    const {name, imageUrl, price, quantity} = cartItem

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
            <div className="arrow" onClick={() => dispatch(removeItemCart(CartItems ,cartItem))}>&#10094;</div>    
                {quantity}
            <div className="arrow" onClick={() => dispatch(addItemToCart(CartItems, cartItem))}>&#10095;</div>    
            </span>
            <span className="price">{price}</span>
            <div onClick={() => dispatch(deleteWholeItem(CartItems, cartItem))} className="remove-button">&#10005;</div>
        </div>
    )
}

export default CheckoutItem