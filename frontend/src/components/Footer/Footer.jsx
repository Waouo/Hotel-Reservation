import { useContext } from 'react'
import Carousel from '../Carousel'
import { CarouselContext } from '../../contexts'
import styles from './Footer.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Footer = () => {
  const { num, variable, setVariable } = useContext(CarouselContext)

  return (
    <footer>
      <Carousel num={num} variable={variable} setVariable={setVariable} />
      <span className={cx('copyright')}>
        <sup>&copy;</sup>GAO SHAO WEI
      </span>
    </footer>
  )
}

export default Footer
