import styles from './SubmitButton.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const SubmitButton = ({ them, children, onClick }) => {
  return (
    <button
      type="submit"
      className={cx('submit-button', { [them]: !!them })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

SubmitButton.propTypes = {
  them: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
}

export default SubmitButton
