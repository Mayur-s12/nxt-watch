import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {AiOutlineClose, AiFillHome, AiOutlineMenu} from 'react-icons/ai'

import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

import {FiLogOut, FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'

import MyContext from '../../context/myContext'
import './index.css'

const Header = props => (
  <MyContext.Consumer>
    {value => {
      const {onClickTheme, isDark} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.push('/login')
      }

      const onClickChange = () => {
        onClickTheme()
      }

      const showLogo = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png '
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const showMoon = isDark ? (
        <FiSun onClick={onClickChange} className="icon-space" />
      ) : (
        <FaMoon onClick={onClickChange} className="icon-space" />
      )
      return (
        <nav className="Header-container">
          <ul className="ul-head ">
            <li>
              <Link to="/">
                <img className="logo-size" src={showLogo} alt="website logo" />
              </Link>
            </li>

            <li className="show-hide-small">
              <button data-testid="theme" className="btn-none">
                {showMoon}
              </button>

              <Popup
                modal
                trigger={<AiOutlineMenu className="icon-space" />}
                className="popup-content"
                position="top"
              >
                {close => (
                  <>
                    <div className="flex-pop">
                      <div>
                        <Link to="/" className="text">
                          <p>
                            <span>
                              <AiFillHome className="space" />
                            </span>
                            Home
                          </p>
                        </Link>
                        <Link to="/trending" className="text">
                          <p>
                            <span>
                              <ImFire className="space" />
                            </span>
                            Trending
                          </p>
                        </Link>
                        <Link to="/gaming" className="text">
                          <p>
                            <span>
                              <SiYoutubegaming className="space" />
                            </span>
                            Gaming
                          </p>
                        </Link>

                        <Link to="/saved-videos" className="text">
                          <p>
                            {' '}
                            <span>
                              <RiMenuAddFill className="space" />
                            </span>
                            Saved videos
                          </p>
                        </Link>
                      </div>
                      <div>
                        <AiOutlineClose onClick={() => close()} />
                      </div>
                    </div>
                  </>
                )}
              </Popup>

              <Popup trigger={<FiLogOut className="icon-space" />} modal>
                {close => (
                  <div className="pop-content">
                    <h3>Are you sure, you want to logout?</h3>
                    <div>
                      <button
                        className="logout-buttons"
                        onClick={onClickLogout}
                      >
                        {' '}
                        Confirm
                      </button>
                      <button
                        className="logout-buttons"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
          <div className="show-hide">
            {showMoon}
            <img
              className="profile-size"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              trigger={
                <button
                  onClick={onClickLogout}
                  className="header-button"
                  type="button"
                >
                  Logout
                </button>
              }
              modal
            >
              {close => (
                <div className="pop-content">
                  <h3>Are you sure, you want to logout?</h3>
                  <div>
                    <button className="logout-buttons" onClick={onClickLogout}>
                      {' '}
                      Confirm
                    </button>
                    <button className="logout-buttons" onClick={() => close()}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </MyContext.Consumer>
)

export default withRouter(Header)
