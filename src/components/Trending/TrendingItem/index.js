import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import MyContext from '../../../context/myContext'
import './index.css'

const TrendingItem = props => {
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

        const white = isDark ? 'color-white' : null
        return (
          <Link to={`/videos/${id}`} className="text-decor">
            <div className={`wrap ${white}`}>
              <img
                className="result-picture"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="display-arrange">
                <div>
                  <img className="profile-img" src={channelProfile} alt="" />
                </div>

                <div className="container-width">
                  <p className="result-title">{title}</p>
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

export default TrendingItem
