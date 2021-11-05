import styles from './Home.scss'
import classNames from 'classnames/bind'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import Footer from '../../components/Footer'

const cx = classNames.bind(styles)

const HomePage = () => {
  return (
    <div className={cx('home')}>
      <div className={cx('home-container', 'row')}>
        <Sidebar />
        <Gallery />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
