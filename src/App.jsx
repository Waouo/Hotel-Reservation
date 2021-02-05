import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RoomsContext } from './contexts'
import { getRoomsApi } from './Api/room'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const [rooms, setRooms] = useState({})
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    ;(async function () {
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
      <RoomsContext.Provider value={{ rooms, success }}>
        <Router>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/room/:id" component={RoomPage} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </RoomsContext.Provider>
    </>
  )
}

export default App
