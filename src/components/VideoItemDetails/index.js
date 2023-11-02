import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player/youtube'
import {BsDot} from 'react-icons/bs'
import Cookies from 'js-cookie'

import {
  AiOutlineClose,
  AiFillHome,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import Header from '../Header'
import MyContext from '../../context/myContext'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    playUrl: '',
    videoDetail: '',
    published: '',
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getVideoApi()
  }

  getVideoApi = async () => {
    this.setState({apiStatus: constants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwt = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const each = data.video_details
      const updatedData = {
        id: each.id,
        videoUrl: each.video_url,
        description: each.description,
        channel: each.channel.name,
        channelProfile: each.channel.profile_image_url,
        publishedAt: each.published_at,
        subscriber: each.channel.subscriber_count,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }
      const publish = formatDistanceToNow(new Date(updatedData.publishedAt))
      this.setState({
        playUrl: updatedData.videoUrl,
        videoDetail: updatedData,
        published: publish,
        saveId: id,
        apiStatus: constants.success,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
    this.setState({isDisliked: false})
  }

  onClickDisLike = () => {
    this.setState(prevState => ({isDisliked: !prevState.isDisliked}))
    this.setState({isLiked: false})
  }

  render() {
    const {
      playUrl,
      videoDetail,
      published,
      isLiked,
      isDisliked,
      isSaved,
      saveId,
    } = this.state

    const showLike = isLiked ? 'clicked-view' : null
    const showDislike = isDisliked ? 'clicked-view' : null

    return (
      <MyContext.Consumer>
        {value => {
          const {savedList, onClickSave, onClickUnSave, isDark} = value

          const show = isDark ? 'change' : null
          const back = isDark ? 'back-gr' : null
          const color = isDark ? 'color' : null

          const onClickAdd = () => {
            this.setState(prevState => ({isSaved: !prevState.isSaved}))

            if (isSaved) {
              const removeSaved = savedList.filter(
                each => videoDetail.id !== each.id,
              )
              onClickUnSave(removeSaved)
            } else {
              onClickSave(videoDetail)
            }
          }

          const apiSuccessView = () => (
            <div className="video-side" id={back}>
              <div>
                <ReactPlayer url={playUrl} width="100%" height="30vh" />
              </div>

              <p className="title-width">{videoDetail.title}</p>
              <div className="flex-views show-not">
                <p>{videoDetail.viewCount} views</p>
                <BsDot />
                <p>{published}</p>
              </div>
              <div className="flex-like">
                <div className="flex-left show-none">
                  <p>{videoDetail.viewCount} views</p>
                  <BsDot />
                  <p>{published}</p>
                </div>
                <div className="flex-left">
                  <button onClick={this.onClickLike} className="no-design">
                    <div className={`flex-left ${showLike} ${color}`}>
                      <AiOutlineLike className="spacing" />
                      <p>Like</p>
                    </div>
                  </button>

                  <button onClick={this.onClickDisLike} className="no-design">
                    <div className={`flex-left ${showDislike} ${color}`}>
                      <AiOutlineDislike className="spacing" />
                      <p>Dislike</p>
                    </div>
                  </button>

                  <button className="no-design" onClick={onClickAdd}>
                    <div className={`flex-left ${color} `}>
                      <RiMenuAddFill className="spacing" />
                      <p>{isSaved ? 'Saved' : 'Save'}</p>
                    </div>
                  </button>
                </div>
              </div>
              <hr />
              <div className="flex-subscriber">
                <div>
                  <img
                    className="prf-size"
                    src={videoDetail.channelProfile}
                    alt="channel logo"
                  />
                </div>
                <div>
                  <p>{videoDetail.channel}</p>
                  <p>{videoDetail.subscriber} subscribers</p>
                </div>
              </div>
              <p>{videoDetail.description}</p>
            </div>
          )

          const loadingView = () => (
            <div>
              <Loader type="ThreeDots" color="blue" height={10} />
            </div>
          )

          const apiFailureView = () => (
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
                <button>Retry</button>
              </p>
            </div>
          )

          const switchStatus = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case constants.success:
                return apiSuccessView()
              case constants.failure:
                return apiFailureView()
              case constants.inProgress:
                return loadingView()
              default:
                return null
            }
          }

          return (
            <div className={show}>
              <Header />
              <div className="videos-flex">
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
                {switchStatus()}
              </div>
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}
export default VideoItemDetails
