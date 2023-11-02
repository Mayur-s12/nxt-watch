import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import TrendingItem from './TrendingItem'
import MyContext from '../../context/myContext'

import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: constants.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingApi()
  }

  getTrendingApi = async () => {
    this.setState({apiStatus: constants.inProgress})

    const jwt = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        channel: each.channel.name,
        channelProfile: each.channel.profile_image_url,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({trendingList: updatedData, apiStatus: constants.success})
      this.apiSuccessView()
    } else {
      this.setState({apiStatus: constants.failure})
      this.apiFailureView()
    }
  }

  apiSuccessView = () => {
    const {trendingList} = this.state
    return (
      <ul>
        {trendingList.map(each => (
          <TrendingItem items={each} key={each.id} />
        ))}
      </ul>
    )
  }

  apiFailureView = () => (
    <div className="fail-container">
      <img
        className="fail-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
      />
      <h3>Oops! Something Went Wrong</h3>
      <p>
        We are having some trouble to complete your request. <br />
        Please try again
      </p>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="blue" height={10} />
    </div>
  )

  switchStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.apiSuccessView()
      case constants.failure:
        return this.apiFailureView()
      case constants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {isDark} = value

          const showDark = isDark ? 'dark-color' : null
          const head = isDark ? 'color-grey' : null
          const white = isDark ? 'color-white' : null
          return (
            <div className={`fixed ${showDark}`}>
              <Header />
              <div className="trending-head">
                <ImFire className="trend-icon" />
                <h2 className="trnd-head-color">Trending</h2>
              </div>
              <div className="display-flex-trending">
                <div className="menu-side">
                  <div>
                    <Link to="/" className={`text ${white}`}>
                      <p>
                        <span>
                          <AiFillHome />
                        </span>
                        Home
                      </p>
                    </Link>
                    <Link to="/trending" className={`text ${white}`}>
                      <p>
                        <span>
                          <ImFire />
                        </span>
                        Trending
                      </p>
                    </Link>
                    <Link to="/gaming" className={`text ${white}`}>
                      <p>
                        <span>
                          <SiYoutubegaming />
                        </span>
                        Gaming
                      </p>
                    </Link>
                    <Link to="/saved-videos" className={`text ${white}`}>
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
                <div className="trend-result-side">{this.switchStatus()}</div>
              </div>
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}
export default Trending
