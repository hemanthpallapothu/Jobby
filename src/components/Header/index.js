import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar-bg-container">
      <img
        alt="website logo"
        className="nav-bar-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      />
      <div className="nav-items-alinement">
        <AiFillHome className="nav-bar-item" />
        <BsFillBriefcaseFill className="nav-bar-item" />
        <FiLogOut className="nav-bar-item" />
      </div>
      <ul className="navbar-items-alinement-md">
        <li className="nav-bar-item-md">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-bar-item-md">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="navbar-logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
