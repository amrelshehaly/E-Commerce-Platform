import {Fragment, useContext} from 'react'
import {Outlet, Link} from 'react-router-dom'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {selectCurrentUser} from '../../store/user/user.selector'
import './navigation.styles.scss'

import {SignOutUser} from '../../utils/firebase/firebase.utils'

import {selectIsCartOpen} from '../../store/cart/cart.selector'
import {useSelector} from 'react-redux'


const Navigation = () =>{

  const isCartOpen = useSelector(selectIsCartOpen);

  const currentUser = useSelector(selectCurrentUser)
    
    return(
      <Fragment>
        <div className="navigation">
            <Link to="/" className="logo-container">
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                
                { currentUser? (<span className="nav-link" onClick={SignOutUser}>SIGN OUT</span>):
                                (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                }
                {currentUser && (<span className="nav-link">{currentUser.displayName}</span>)}
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation