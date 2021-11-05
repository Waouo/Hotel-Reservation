import Carousel from '../Carousel'
import styles from './Footer.scss'
import classNames from 'classnames/bind'
import bgImagesPath from './bgImagesPath'

const cx = classNames.bind(styles)

const Footer = () => {
  return (
    <footer>
      <Carousel
        imageUrl={bgImagesPath}
        imageClassName={'home-page-img'}
      />
      <span className={cx('copyright')}>
        <sup>&copy;</sup>GAO SHAO WEI
      </span>
    </footer>
  )
}

export default Footer
