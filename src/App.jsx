import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { useEffect, useState } from 'react'
import { RoomsContext } from './contexts'
import { getRoomsApi } from './Api/room'

const App = () => {
  const [rooms, setRooms] = useState({})
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getRoomsApi()
        setRooms(data.items)
        setSuccess(data.success)
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`)
      }
    })()
  }, [])
  return (
    <>
      <Router>
        <Switch>
          <RoomsContext.Provider value={{ rooms, success }}>
            <Route exact path="/" component={HomePage} />
          </RoomsContext.Provider>
        </Switch>
      </Router>
    </>
  )
}

export default App
