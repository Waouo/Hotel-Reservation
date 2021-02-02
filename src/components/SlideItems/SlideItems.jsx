import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './SlideItems.module.scss'

const SlideItems = ({ num, variable, setVariable }) => {
  const numArray = Array(num)
    .fill()
    .map((_, index) => index)

  useEffect(() => {})

  return (
    <form className={styles.slideItems}>
      {numArray.map((_, index) => (
        <label key={index} htmlFor={index} className={styles.slideItems__label}>
          <input
            type="radio"
            name="slideItem"
            id={index}
            value={index}
            onChange={(e) => setVariable(Number(e.currentTarget.value))}
            checked={variable === index}
            className={styles.slideItems__input}
          />
          <span className={styles.slideItems__control}></span>
        </label>
      ))}
    </form>
  )
}

SlideItems.propTypes = {
  num: PropTypes.number.isRequired,
  variable: PropTypes.number.isRequired,
  setVariable: PropTypes.func.isRequired,
  className: PropTypes.object,
}

export default SlideItems
