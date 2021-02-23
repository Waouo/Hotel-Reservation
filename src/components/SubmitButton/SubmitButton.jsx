import styles from './SubmitButton.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const SubmitButton = ({ background, children }) => {
  return (
    <button type="submit" className={cx('submit-button')} style={{ background }}>
      {children}
    </button>
  )
}

SubmitButton.propTypes = {
  background: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default SubmitButton
