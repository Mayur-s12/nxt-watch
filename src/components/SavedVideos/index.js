import {Link} from 'react-router-dom'
import {Component} from 'react'

import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

import Header from '../Header'
import MyContext from '../../context/myContext'
import SavedItem from './SavedItem'

import './index.css'

class SavedVideos extends Component {
  noResultView = () => (
    <div className="display-noresult">
      <img
        className="smoll-size-noresult"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h3>No saved videos found</h3>
      <p>You can save your videos while watching them</p>
    </div>
  )

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {savedList, isDark} = value

          const show = isDark ? 'change' : null

          const noList = savedList.length === 0

          const noVideosSaved = noList ? this.noResultView() : null

          return (
            <div className={show}>
              <Header />
              <div className="trending-head">
                <ImFire className="trend-icon" />
                <h2 className="trnd-head-color">Saved Videos</h2>
              </div>
              <div className="display-flex-trending">
                <div className="menu-side">
                  <div>
                    <Link to="/" className={`text ${show}`}>
                      <p>
                        <span>
                          <AiFillHome />
                        </span>
                        Home
                      </p>
                    </Link>
                    <Link to="/trending" className={`text ${show}`}>
                      <p>
                        <span>
                          <ImFire />
                        </span>
                        Trending
                      </p>
                    </Link>
                    <Link to="/gaming" className={`text ${show}`}>
                      <p>
                        <span>
                          <SiYoutubegaming />
                        </span>
                        Gaming
                      </p>
                    </Link>
                    <Link to="/saved-videos" className={`text ${show}`}>
                      <p>
                        {' '}
                        <span>
                          <RiMenuAddFill />
                        </span>
                        Saved videos
                      </p>
                    </Link>
                  </div>
                  <div>
                    <p>CONTACT US</p>
                    <div>
                      <img
                        className="contact-logo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <img
                        className="contact-logo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <img
                        className="contact-logo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </div>
                    <p>Enjoy! Now to see your channels and recommendations!</p>
                  </div>
                </div>
                {noVideosSaved}
                <div className="trend-result-side">
                  {savedList.map(each => (
                    <SavedItem items={each} key={each.id} />
                  ))}
                </div>
              </div>
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default SavedVideos
