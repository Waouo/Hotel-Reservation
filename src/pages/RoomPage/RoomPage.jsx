import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames/bind'
import styles from './RoomPage.scss'
import PropTypes from 'prop-types'
import Amenities from '../../components/Amenities'
import SubmitButton from '../../components/SubmitButton'
import { BookingContext } from '../../contexts'
import useBackGround from '../../hook/useBackGround'
import useGetRoomDetails from '../../hook/useGetRoomDetails'
import useCalendarStatus from '../../hook/useCalendarStatus'
import loadable from '@loadable/component'

const BookingPage = loadable(() => import('../BookingPage'))
const Carousel = loadable(() => import('../../components/Carousel'))
const Calendar = loadable(() => import('../../components/Calendar'))

const cx = classNames.bind(styles)

const RoomPage = ({ match, history }) => {
  const { room, booking, des, success } = useGetRoomDetails(match.params.id)
  const bgObj = useBackGround(room.imageUrl)
  const [showBooking, setShowBooking] = useState(false)

  //BookingContext
  const {
    dateArr,
    weekArr,
    state,
    nightsObj,
    bookingArr,
    setState,
    tomorrow,
  } = useCalendarStatus(booking)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(
      room.normalDayPrice * nightsObj.normal +
        room.holidayPrice * nightsObj.holiday
    )
  }, [nightsObj, room])

  return (
    <BookingContext.Provider
      value={{
        state,
        setState,
        tomorrow,
        nightsObj,
        bookingArr,
        dateArr,
        totalPrice,
      }}
    >
      <div className={cx('room-details')}>
        <TransitionGroup component={null}>
          <CSSTransition
            classNames="animation-fade"
            timeout={{
              appear: 1000,
              enter: 1000,
              exit: 0,
            }}
            key={showBooking}
          >
            <div className={cx('booking-page', { show: showBooking })}>
              <BookingPage
                showBooking={showBooking}
                setShowBooking={setShowBooking}
                room={room}
                history={history}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>

        <section className={cx('panel')}>
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="animation-fade"
              timeout={1000}
              key={bgObj?.num}
            >
              <img
                className={cx('bg')}
                src={bgObj?.src}
                alt={'background-image'}
              />
            </CSSTransition>
          </TransitionGroup>
          <Link to="/" className={cx('prePage')}>
            <span className={cx('arrow')}> &lt; </span>查看其它房型
          </Link>
          <div className={cx('booking')}>
            <div style={{ width: '252px' }}>
              <h2 className={cx('booking-price')}>
                <span>${totalPrice || null}</span>
                &nbsp; / &nbsp; {nightsObj.normal + nightsObj.holiday}晚
              </h2>
              <a href="#booking" style={{ margin: '0 auto' }}>
                <SubmitButton onClick={() => setShowBooking(true)}>
                  Booking now
                </SubmitButton>
              </a>
            </div>
            <Carousel
              num={3}
              variable={bgObj?.num}
              setVariable={bgObj?.setNum}
              color={'light-green'}
            />
          </div>
        </section>
        <main className={cx('info')}>
          <div className={cx('info-container')}>
            <h1 className={cx('room-name')}>
              {room.name}

              <span>
                {des.GuestMax === 1
                  ? '1'
                  : `${des.GuestMin || ''} ~ ${des.GuestMax || ''}`}
                人・ {des.Bed && `${des.Bed.length}`}張床・ 附早餐・衛浴
                {des['Private-Bath']}間・{des.Footage}
                平方公尺
              </span>
            </h1>
            <ul className={cx('time')}>
              <li>
                平日（一～四）價格：${room.normalDayPrice} /
                假日（五〜日）價格： ${room.holidayPrice}
              </li>
              <li>
                入住時間：
                {room.checkInAndOut?.checkInEarly}
                （最早）/ {room.checkInAndOut?.checkInLate}（最晚）
              </li>
              <li>退房時間：{room.checkInAndOut?.checkOut}</li>
            </ul>
            <ul className={cx('description')}>
              <li>
                {room.name}{' '}
                {des.GuestMax === 1
                  ? '僅供一位客人'
                  : `供${des.GuestMin || ''}~${des.GuestMax || ''}人使用`}
                使用。
              </li>
              <li>
                臥室配有
                {des.Bed && des.Bed.length > 1 && `${des?.Bed.length}張 `}
                {des.Bed && `${des.Bed[0]} Bed `}和私人浴室。
              </li>
              <li>
                您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。
              </li>
              <li>房間裡有 AC，當然還有 WiFi。</li>
            </ul>
            <Amenities room={room} />
            <h2 className={cx('room-empty-status')}>空房間狀態查詢</h2>
            <Calendar />
          </div>
        </main>
      </div>
    </BookingContext.Provider>
  )
}

RoomPage.propTypes = {
  match: PropTypes.any,
}

export default RoomPage
