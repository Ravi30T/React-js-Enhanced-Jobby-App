import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Headers = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  const {history} = props
  const path = history.location.pathname

  const homeActive = path === '/' ? 'home-active' : ''
  const jobsActive = path === '/jobs' ? 'jobs-active' : ''

  return (
    <>
      <nav className="sm-navbar-container">
        <div className="sm-nav-bar-img-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
              className="website-logo"
            />
          </Link>
        </div>

        <ul className="sm-nav-bar-buttons-container">
          <li className="headers-list-item">
            <Link to="/">
              <button
                type="button"
                aria-label="home-icon"
                className="sm-header-icon-btn"
              >
                <AiFillHome className="sm-navbar-btn-home-icon" />
              </button>
            </Link>
          </li>

          <li className="headers-list-item">
            <Link to="/jobs">
              <button
                type="button"
                aria-label="jobs-icon"
                className="sm-header-icon-btn"
              >
                <BsBriefcaseFill className="sm-navbar-btn-jobs-icon" />
              </button>
            </Link>
          </li>

          <li className="headers-list-item">
            <button
              type="button"
              aria-label="logout-icon"
              className="sm-header-icon-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="sm-navbar-btn-logout-icon" />
            </button>
          </li>
        </ul>
      </nav>

      <nav className="lg-navbar-container">
        <div className="lg-nav-bar-img-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
              className="website-logo"
            />
          </Link>
        </div>

        <div className="lg-nav-bar-buttons-container">
          <Link to="/" className="link-item">
            <p className={`nav-home-btn ${homeActive}`}> Home </p>
          </Link>

          <Link to="/jobs" className="link-item">
            <p className={`nav-jobs-btn ${jobsActive}`}> Jobs </p>
          </Link>
        </div>

        <div>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Headers)
