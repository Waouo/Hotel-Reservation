import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import { RoomsContext } from './contexts'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import NotFoundPage from './pages/NotFoundPage'
import useGetRooms from './hook/useGetRooms'

const App = () => {
  //RoomsContext
  const { rooms, success } = useGetRooms()

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
