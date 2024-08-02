import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <div className="logo-form-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo"
              alt=" website logo"
            />
          </div>

          <form onSubmit={this.submitForm}>
            <div className="input-name-box-container">
              <label className="label-item" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-box"
                placeholder="Username"
                onChange={this.onEnterUsername}
                value={username}
              />
            </div>

            <div className="input-password-box-container">
              <label className="label-item" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-box"
                placeholder="Password"
                onChange={this.onEnterPassword}
                value={password}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="login-error-msg"> *{errorMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
