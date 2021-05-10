import { useState } from 'react'
import styles from './BookingPage.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import Amenities from '../../components/Amenities'
import BookingResult from '../../components/BookingResult'
import BookingForm from '../../components/BookingForm'

dayjs.extend(isSameOrAfter)

const cx = classNames.bind(styles)

const BookingPage = ({ showBooking, setShowBooking, room }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleExit = () => {
    setShowBooking(false)

    // Use setTimeout to prevent booking page show the form before page was closed
    setTimeout(() => {
      setIsSuccess(false)
      setIsError(false)
    }, 100)
  }

  return (
    <div className={cx('booking-container')}>
      <button
        className={cx('exit', { light: isSuccess || isError })}
        onClick={handleExit}
      >
        Ｘ
      </button>
      {isSuccess ? (
        <BookingResult result={'success'} />
      ) : isError ? (
        <BookingResult result={'error'} />
      ) : (
        <>
          <BookingForm
            roomId={room.id}
            setIsSuccess={setIsSuccess}
            setIsError={setIsError}
          />
          <section id="booking" className={cx('booking-info')}>
            <h1 className={cx('room-name')}>{room.name}</h1>
            <p>1人・ 單人床・附早餐・ 衛浴1間・18平方公尺</p>
            <p style={{ marginTop: '10px' }}>
              平日（一～四）價格：{room.normalDayPrice} / 假日（五〜日）價格：
              {room.holidayPrice}
            </p>
            <Amenities room={room} displayOnlyTrue={true} type={'booking'} />
            <h2 className={cx('second-title')}>訂房資訊</h2>
            <ul className={cx('room-description')}>
              <li>
                ・入住時間： 最早{room.checkInAndOut?.checkInEarly}, 最晚
                {room.checkInAndOut?.checkInLate};退房時間
                {room.checkInAndOut?.checkOut}，請自行確認行程安排
              </li>
              <li>・平日定義週一至週四；假日定義週五至週日及國定假日。</li>
              <li>・好室旅店全面禁止吸菸。</li>
              <li>
                ・若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六
                10:00 - 18:00 )。
              </li>
            </ul>
            <h2 className={cx('second-title')}>預約流程</h2>
            <div className={cx('flow-chart-container')}>
              <div className={cx('flow-chart-item', 'arrow')}>
                <div className={cx('flow-chart-icon-bg')}>
                  <img src="../../../public/images/note.svg" />
                </div>
                <div className={cx('flow-chart-des')}>送出線上預約單</div>
              </div>
              <div className={cx('flow-chart-item', 'arrow')}>
                <div className={cx('flow-chart-icon-bg')}>
                  <img src="../../../public/images/search.svg" />
                </div>
                <div className={cx('flow-chart-des')}>
                  <p>系統立即回覆是否預訂成功</p>
                  <p>並以簡訊發送訂房通知</p>
                  <p> (若未收到簡訊請來電確認)</p>
                </div>
              </div>
              <div className={cx('flow-chart-item')}>
                <div className={cx('flow-chart-icon-bg')}>
                  <img src="../../../public/images/pay.svg" />
                </div>
                <div className={cx('flow-chart-des')}>
                  <p>入住當日憑訂房通知</p>
                  <p>以現金或刷卡付款即可</p>
                  <p>(僅接受VISA.JCB.銀聯卡)</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

BookingPage.propTypes = {
  showBooking: PropTypes.bool.isRequired,
  setShowBooking: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
}

export default BookingPage
