import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userName: '', pass: '', loginError: '', showPass: false}

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePass = event => {
    this.setState({pass: event.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPass: !prevState.showPass}))
  }

  onApiSuccess = JWT => {
    const {history} = this.props
    Cookies.set('jwt_token', JWT, {expires: 30})
    history.push('/')
  }

  onApiFailure = Msg => {
    this.setState({loginError: `*${Msg}`})
  }

  onSubmitForm = event => {
    event.preventDefault()

    this.getApiStatus()
  }

  getApiStatus = async () => {
    const {userName, pass} = this.state

    const userDetails = {
      username: userName,
      password: pass,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onApiSuccess(data.jwt_token)
    } else {
      this.onApiFailure(data.error_msg)
    }
  }

  render() {
    const {loginError, showPass} = this.state
    console.log(showPass)
    return (
      <div className="login-bg-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <div className="logo-container">
            <img
              className="logo-login-size"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </div>

          <label htmlFor="user">USERNAME</label>
          <input
            id="user"
            type="text"
            placeholder="  Username"
            onChange={this.onChangeUsername}
          />

          <label htmlFor="pass">PASSWORD</label>
          <input
            id="pass"
            type={showPass ? 'text' : 'password'}
            placeholder="  Password"
            onChange={this.onChangePass}
          />
          <div className="checkbox-cont">
            <input
              onClick={this.onCheckChange}
              className="checkbox-class"
              id="check"
              type="checkbox"
            />
            <label htmlFor="check">Show Password</label>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-err">{loginError}</p>
        </form>
      </div>
    )
  }
}

export default Login
