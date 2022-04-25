import React,{useContext} from 'react'
import Button from '../button/button.component'
import './product-card.styles.scss'

import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart} from '../../store/cart/cart.action'
import {selectCartItems} from '../../store/cart/cart.selector'

const ProductCard = ({product}) => {

    const CartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();


    const {name,price,imageUrl}  = product
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={()=> dispatch(addItemToCart(CartItems, product))}>Add to cart</Button>
        </div>
    )
}


export default ProductCard