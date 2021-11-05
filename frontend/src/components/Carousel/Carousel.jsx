import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './Carousel.scss'
import classNames from 'classnames/bind'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const cx = classNames.bind(styles)

const Carousel = ({ imageUrl, color, imageClassName, pauseFunction }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [imgNum, setImgNum] = useState(0)
  const buttonQty = imageUrl.length
  const [paused, setPaused] = useState(false)

  const numArray = Array(imageUrl.length)
    .fill()
    .map((_, index) => index)

  // Preload images
  useEffect(() => {
    if (imageUrl) {
      imageUrl.forEach((imageUrl) => {
        let image = document.createElement('img')
        image.src = imageUrl
        image.rel = 'preload'
      })

      setImgSrc(imageUrl[imgNum])
    }
  }, [imgNum, imageUrl, setImgSrc])

  // Change image periodically
  useEffect(() => {
    let timer = setInterval(() => {
      if (pauseFunction && !paused) {
        if (imgNum < buttonQty - 1) {
          setImgNum(imgNum + 1)
        } else {
          setImgNum(0)
        }
      }
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [setImgNum, buttonQty, imgNum, pauseFunction, paused])

  return (
    <div
      className={cx('carousel')}
      onMouseEnter={() => {
        setPaused(true)
      }}
      onMouseLeave={() => {
        setPaused(false)
      }}
    >
      <TransitionGroup component={null}>
        <CSSTransition classNames="animation-fade" timeout={500} key={imgSrc}>
          <img className={cx(imageClassName)} src={imgSrc} />
        </CSSTransition>
      </TransitionGroup>
      <div className={cx('slideItems', color)}>
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
      </div>
    </div>
  )
}

Carousel.propTypes = {
  imageUrl: PropTypes.array.isRequired,
  color: PropTypes.string,
  imageClassName: PropTypes.string,
  pauseFunction: PropTypes.bool,
}

export default Carousel
