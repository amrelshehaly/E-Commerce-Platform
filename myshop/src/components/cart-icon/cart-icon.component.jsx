import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'


import {useSelector, useDispatch} from 'react-redux'
import {selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector'
import {setIsCartOpen} from '../../store/cart/cart.action'

const CartIcon = () =>{

    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch()

    const toogleIsCartToggle = () =>{
        dispatch(setIsCartOpen(!isCartOpen))
    }

    return(
        <div className="cart-icon-container" onClick={toogleIsCartToggle}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon