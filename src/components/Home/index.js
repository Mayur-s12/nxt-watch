import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import MyContext from '../../context/myContext'

import ResultsItem from './ResultsItem'

import Header from '../Header'
import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    closed: true,
    resultsList: [],
    searchInput: '',
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getResultsApi()
  }

  onCloseBanner = () => {
    this.setState(prevState => ({closed: !prevState.closed}))
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getResultsApi)
  }

  onClickSearch = () => {
    this.getResultsApi()
  }

  apiSuccessView = () => {
    const {resultsList} = this.state
    return (
      <>
        {resultsList.map(each => (
          <ResultsItem items={each} key={each.id} />
        ))}
      </>
    )
  }

  apiFailureView = () => (
    <div>
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

  onClickRetry = () => {
    this.setState({searchInput: ''}, this.getResultsApi)
  }

  noResultView = () => (
    <div className="display-noresult">
      <img
        className="smoll-size-noresult"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h3>No Search results found</h3>
      <p>Try different key words or remove search filter</p>
      <button onClick={this.onClickRetry}>Retry</button>
    </div>
  )

  getResultsApi = async () => {
    this.setState({apiStatus: constants.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwt = Cookies.get('jwt_token')
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
      this.setState({resultsList: updatedData, apiStatus: constants.success})
      this.apiSuccessView()
    } else {
      this.setState({apiStatus: constants.failure})
      this.apiFailureView()
    }
  }

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
    const {resultsList, searchInput} = this.state

    const noResults = resultsList.length === 0
    const showNoResult = noResults ? this.noResultView() : null

    return (
      <MyContext.Consumer>
        {value => {
          const {isDark} = value
          const {closed} = this.state

          const showDark = isDark ? 'dark-color' : null

          return (
            <div className={showDark}>
              <Header />
              <div className={`large-screen-div ${showDark}`}>
                <div className="menu-item">
                  <div className={showDark}>
                    <Link to="/" className={`text ${showDark}`}>
                      <p>
                        <span>
                          <AiFillHome />
                        </span>
                        Home
                      </p>
                    </Link>
                    <Link to="/trending" className={`text ${showDark}`}>
                      <p>
                        <span>
                          <ImFire />
                        </span>
                        Trending
                      </p>
                    </Link>
                    <Link to="/gaming" className={`text ${showDark}`}>
                      <p>
                        <span>
                          <SiYoutubegaming />
                        </span>
                        Gaming
                      </p>
                    </Link>
                    <Link to="/saved-videos" className={`text ${showDark}`}>
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
                <div className="other-side">
                  {closed ? (
                    <div className="home-banner" data-testid="banner">
                      <div>
                        <img
                          className="banner-img-size"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p className="banner-heading">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="banner-button">
                          GET IT NOW
                        </button>
                      </div>
                      <div data-testid="close" className="banner-close">
                        <AiOutlineClose onClick={this.onCloseBanner} />
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <input
                      placeholder=" search"
                      className="search-input"
                      type="search"
                      value={searchInput}
                      onChange={this.onSearchInput}
                    />
                    <button
                      type="button"
                      onClick={this.onClickSearch}
                      className="search-button"
                      data-testid="searchButton"
                    >
                      <BiSearch />
                    </button>
                  </div>

                  {showNoResult}
                  <div className="switch-class">{this.switchStatus()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Home
