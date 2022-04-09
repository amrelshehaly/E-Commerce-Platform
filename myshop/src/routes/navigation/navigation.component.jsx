import {Fragment, useContext} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {userContext} from '../../contexts/user.context'
import './navigation.styles.scss'

import {SignOutUser} from '../../utils/firebase/firebase.utils'

const Navigation = () =>{
    const {currentUser} = useContext(userContext)
    
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
            </div>
            <div className="nav-links-container">
                
                    { currentUser? (<span className="nav-link" onClick={SignOutUser}>SIGN OUT</span>):
                                    (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation