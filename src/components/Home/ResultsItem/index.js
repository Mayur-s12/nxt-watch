import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'
import MyContext from '../../../context/myContext'

const ResultsItem = props => {
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

        const showTitle = isDark ? 'color-white' : null

        return (
          <Link to={`/videos/${id}`} className="text-decor">
            <li className="wrap">
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
                  <p className={`result-title ${showTitle}`}>{title}</p>
                  <div className="display-flex">
                    <p className="para">{channel}</p>
                    <BsDot className="para margin-auto" />
                    <p className="para">{viewCount}</p>

                    <BsDot className="para margin-auto" />
                    <p className="para">{published}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </MyContext.Consumer>
  )
}

export default ResultsItem
