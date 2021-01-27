import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <>
      <Router>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
