import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import MyContext from '../../../context/myContext'
import './index.css'

const GamingItem = props => {
  const {items} = props
  const {id, title, viewCount, thumbnailUrl} = items

  return (
    <MyContext.Consumer>
      {value => {
        const {isDark} = value

        const showTitle = isDark ? 'show' : null
        return (
          <Link
            to={`/videos/${id}`}
            className={`spacing text-decor ${showTitle}`}
          >
            <img
              className="game-img"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <p className="game-title">{title}</p>
            <p className="game-title">{viewCount} Watching Worldwide</p>
          </Link>
        )
      }}
    </MyContext.Consumer>
  )
}

export default GamingItem
