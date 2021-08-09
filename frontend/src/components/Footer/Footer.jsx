import { useContext } from 'react'
import Carousel from '../Carousel'
import { CarouselContext } from '../../contexts'
import styles from './Footer.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Footer = () => {
  const { imageUrl, setImgSrc } = useContext(CarouselContext)

  return (
    <footer>
      <Carousel imageUrl={imageUrl} setImgSrc={setImgSrc} />
      <span className={cx('copyright')}>
        <sup>&copy;</sup>GAO SHAO WEI
      </span>
    </footer>
  )
}

export default Footer
