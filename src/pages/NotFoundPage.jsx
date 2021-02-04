import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="a">Page Not Found</h1>
      <Link to="/">Go back to home</Link>
    </div>
  )
}

export default NotFoundPage
