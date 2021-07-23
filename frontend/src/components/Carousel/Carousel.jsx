import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './Carousel.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Carousel = ({ num, variable, setVariable, color }) => {
  const numArray = Array(num)
    .fill()
    .map((_, index) => index)

  useEffect(() => {
    let timer = setInterval(() => {
      setVariable((e) => {
        if (e < num - 1) {
          setVariable(e + 1)
        } else {
          e = 0
          setVariable(0)
        }
      })
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [setVariable, variable, num])

  return (
    <form className={cx('slideItems', color)}>
      {numArray.map((_, index) => (
        <label key={index} htmlFor={index} className={cx('slideItems-label')}>
          <input
            type="radio"
            name="slideItem"
            id={index}
            value={index}
            onChange={(e) => setVariable(Number(e.currentTarget.value))}
            checked={variable === index}
            className={cx('slideItems-input')}
          />
          <span className={cx('slideItems-control')}></span>
        </label>
      ))}
    </form>
  )
}

Carousel.propTypes = {
  num: PropTypes.number.isRequired,
  variable: PropTypes.number.isRequired,
  setVariable: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default Carousel
