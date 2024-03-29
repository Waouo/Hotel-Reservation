import styles from './ImageSlider.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const ImageSlider = ({ imageUrl, setShowSlider }) => {
  const [imageSrc, setImgSrc] = useState('')
  const [imageNum, setImageNum] = useState(0)

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl[imageNum])
    }
  }, [imageUrl, imageNum, setImgSrc])

  const handleLastImage = () => {
    if (imageNum !== 0) {
      setImageNum(imageNum - 1)
    } else {
      setImageNum(imageUrl.length - 1)
    }
  }

  const handleNextImage = () => {
    if (imageNum < imageUrl.length - 1) {
      setImageNum(imageNum + 1)
    } else {
      setImageNum(0)
    }
  }

  function handleExit(e) {
    // Prevent propagation of children
    if (e.target.tagName !== 'DIV') {
      return
    }
    setShowSlider(false)
  }

  return (
      <div
        className={cx('image-slider')}
        onClick={handleExit}
      >
        <button className={cx('img-btn')} onClick={handleLastImage}>
          &lt;
        </button>
        <img
          className={cx('image-slider-img')}
          src={imageSrc}
          alt="room-image"
        />
        <button className={cx('img-btn')} onClick={handleNextImage}>
          &gt;
        </button>
      </div>
  )
}

ImageSlider.propTypes = {
  imageUrl: PropTypes.array.isRequired,
  setShowSlider: PropTypes.func.isRequired,
}

export default ImageSlider
