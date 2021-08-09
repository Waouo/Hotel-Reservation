import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './Carousel.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Carousel = ({ imageUrl, setImgSrc, color }) => {
  const [imgNum, setImgNum] = useState(0)
  const buttonQty = imageUrl.length

  const numArray = Array(imageUrl.length)
    .fill()
    .map((_, index) => index)

  // Preload images
  useEffect(() => {
    if (imageUrl) {
      imageUrl.forEach((imageUrl) => {
        let img = new Image()
        img.imgSrc = imageUrl
        img.rel = 'preload'
      })

      setImgSrc(imageUrl[imgNum])
    }
  }, [imgNum, imageUrl, setImgSrc])

  // Change image periodically
  useEffect(() => {
    let timer = setInterval(() => {
      if (imgNum < buttonQty - 1) {
        setImgNum(imgNum + 1)
      } else {
        setImgNum(0)
      }
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [setImgNum, buttonQty, imgNum])

  return (
    <form className={cx('slideItems', color)}>
      {numArray.map((_, index) => (
        <label key={index} htmlFor={index} className={cx('slideItems-label')}>
          <input
            type="radio"
            name="slideItem"
            id={index}
            value={index}
            onChange={(e) => setImgNum(Number(e.currentTarget.value))}
            checked={imgNum === index}
            className={cx('slideItems-input')}
          />
          <span className={cx('slideItems-control')}></span>
        </label>
      ))}
    </form>
  )
}

Carousel.propTypes = {
  imageUrl: PropTypes.array.isRequired,
  setImgSrc: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default Carousel
