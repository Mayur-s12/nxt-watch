import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import MyContext from './context/myContext'

import './App.css'

class App extends Component {
  state = {savedList: [], isDark: false}

  onClickSave = videoDetails => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, videoDetails],
    }))
  }

  onClickUnSave = details => {
    this.setState({
      savedList: details,
    })
  }

  onClickTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {savedList, isDark} = this.state

    return (
      <MyContext.Provider
        value={{
          savedList,
          isDark,
          onClickSave: this.onClickSave,
          onClickUnSave: this.onClickUnSave,
          onClickTheme: this.onClickTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <NotFound />
        </Switch>
      </MyContext.Provider>
    )
  }
}
export default App
