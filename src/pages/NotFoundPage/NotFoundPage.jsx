import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './NotFoundPage.scss'

const NotFoundPage = () => {
  const cx = classNames.bind(styles)

  return (
    <div id={cx('not-found')}>
      <h1 className="a">404 Page Not Found</h1>
      <Link to="/">Go back to home</Link>
    </div>
  )
}

export default NotFoundPage
