import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './SlideItems.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const SlideItems = ({ num, variable, setVariable }) => {
  const numArray = Array(num)
    .fill()
    .map((_, index) => index)

  useEffect(() => {})

  return (
    <form className={cx('slideItems', 'light-green')}>
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

SlideItems.propTypes = {
  num: PropTypes.number.isRequired,
  variable: PropTypes.number.isRequired,
  setVariable: PropTypes.func.isRequired,
}

export default SlideItems
