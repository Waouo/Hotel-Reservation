import { useState, useContext } from 'react'
import styles from './BookingPage.scss'
import classNames from 'classnames/bind'
import loadable from '@loadable/component'
import Amenities from '../../components/Amenities'
import BookingForm from '../../components/BookingForm'
import { RoomsContext } from '../../contexts'
import RoomSize from '../../components/RoomSize'

const BookingResult = loadable(() => import('../../components/BookingResult'))

const cx = classNames.bind(styles)

const BookingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const { room, setShowBooking } = useContext(RoomsContext)

  const handleExit = () => {
    setShowBooking(false)

    // Use setTimeout to prevent booking page show the form before page was closed
    setTimeout(() => {
      setIsSuccess(false)
      setIsError(false)
    }, 100)
  }

  return (
    <div className={cx('booking-container', 'row')}>
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
          {room.id ? (
            <BookingForm
              roomId={room.id}
              setIsSuccess={setIsSuccess}
              setIsError={setIsError}
            />
          ) : (
            ''
          )}

          <section
            id="booking"
            className={cx('booking-info', 'col-md-7', 'order-md-2', 'order-1')}
          >
            <h1 className={cx('room-name')}>{room.name}</h1>
            <p><RoomSize/></p>
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
                <p className={cx('flow-chart-des')}>送出線上預約單</p>
              </div>
              <img src="../../../public/images/flow-chart-arrow.svg" />
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
              <img src="../../../public/images/flow-chart-arrow.svg" />
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

export default BookingPage
