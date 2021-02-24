import styles from './BookingSuccess.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const BookingSuccess = () => {
  return (
    <div className={cx('booking-success')}>
      <img src={'../../.././public/images/success-icon.svg'} />
      <h1>預約成功</h1>
      <p>請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，</p>
      <p>若未收到簡訊請來電確認，謝謝您</p>
    </div>
  )
}

export default BookingSuccess
