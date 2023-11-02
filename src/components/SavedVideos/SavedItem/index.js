import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import MyContext from '../../../context/myContext'
import './index.css'

const SavedItem = props => {
  const {items} = props
  const {
    id,
    title,
    channel,
    viewCount,
    publishedAt,
    thumbnailUrl,
    channelProfile,
  } = items

  const published = formatDistanceToNow(new Date(publishedAt))

  return (
    <MyContext.Consumer>
      {value => {
        const {isDark} = value

        const show = isDark ? 'change' : null
        return (
          <Link to={`/videos/${id}`} className={`text-decor ${show}`}>
            <div className="wrap">
              <img
                className="result-picture"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="display-arrange">
                <div>
                  <img
                    className="profile-img"
                    src={channelProfile}
                    alt="channel logo"
                  />
                </div>

                <div className="container-width">
                  <h1 className="result-title">{title}</h1>
                  <div className="display-flex">
                    <p className="para">{channel}</p>
                    <BsDot className="para margin-auto" />
                    <p className="para">{viewCount}</p>

                    <BsDot className="para margin-auto" />
                    <p className="para">{published}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </MyContext.Consumer>
  )
}

export default SavedItem
