import styles from './BookingResult.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

const BookingResult = ({ result }) => {
  return (
    <div className={cx('booking-result')}>
      {result === 'success' && (
        <>
          <img src={'../../.././public/images/success.svg'} />
          <h1>預約成功</h1>
          <p>請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，</p>
          <p>若未收到簡訊請來電確認，謝謝您</p>
        </>
      )}
      {result === 'error' && (
        <>
          <img src={'../../.././public/images/error.svg'} />
          <h1>預約失敗</h1>
          <p>哎呀！晚了一步！您預約的日期已經被預約走了，</p>
          <p>再看看其它房型吧</p>
        </>
      )}
    </div>
  )
}

BookingResult.propTypes = {
  result: PropTypes.string.isRequired,
}

export default BookingResult
