import React from 'react'

const MyContext = React.createContext({
  savedList: [],
  isDark: false,
  onClickSave: () => {},
  onClickUnSave: () => {},
  onClickTheme: () => {},
})

export default MyContext
