import {useContext} from 'react'
import './checkout-item.styles.scss'
import {CartContext} from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) =>{
    const {deleteWholeItem, addItemToCart, removeItemCart} = useContext(CartContext)
    const {name, imageUrl, price, quantity} = cartItem

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
            <div className="arrow" onClick={() => removeItemCart(cartItem)}>&#10094;</div>    
                {quantity}
            <div className="arrow" onClick={() => addItemToCart(cartItem)}>&#10095;</div>    
            </span>
            <span className="price">{price}</span>
            <div onClick={() => deleteWholeItem(cartItem)} className="remove-button">&#10005;</div>
        </div>
    )
}

export default CheckoutItem