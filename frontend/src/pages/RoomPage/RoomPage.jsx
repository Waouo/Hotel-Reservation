import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames/bind'
import styles from './RoomPage.scss'
import PropTypes from 'prop-types'
import Amenities from '../../components/Amenities'
import SubmitButton from '../../components/SubmitButton'
import RoomSize from '../../components/RoomSize'
import { BookingContext, RoomsContext } from '../../contexts'
import useGetRoomDetails from '../../hook/useGetRoomDetails'
import useCalendarStatus from '../../hook/useCalendarStatus'
import loadable from '@loadable/component'
import ImageSlider from '../../components/ImageSlider'

const BookingPage = loadable(() => import('../BookingPage'))
const Carousel = loadable(() => import('../../components/Carousel'))
const Calendar = loadable(() => import('../../components/Calendar'))

const cx = classNames.bind(styles)

const RoomPage = ({ match }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [showSlider, setShowSlider] = useState(false)

  //RoomsContext
  const { room, bookedDates, des } = useGetRoomDetails(match.params.id)
  const [showBooking, setShowBooking] = useState(false)

  //BookingContext
  const { selectedDates, state, nightsObj, disabledDates, setState, tomorrow } =
    useCalendarStatus(bookedDates)
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
        disabledDates,
        selectedDates,
        totalPrice,
      }}
    >
      <RoomsContext.Provider value={{ room, des, setShowBooking }}>
        <div className={cx('room-page')}>
          <CSSTransition
            in={showBooking}
            classNames="animation-fade"
            timeout={500}
            unmountOnExit
          >
            <div className={cx('booking-page')}>
              <BookingPage />
            </div>
          </CSSTransition>
          <CSSTransition
            in={showSlider}
            classNames="animation-fade"
            timeout={500}
            unmountOnExit
          >
              <ImageSlider
                imageUrl={room?.imageUrl}
                setShowSlider={setShowSlider}
              />
          </CSSTransition>

          <div className={cx('room-page-container', 'row')}>
            <section className={cx('carousel-section', 'col-md-5', 'col-12')}>
              <TransitionGroup component={null}>
                <CSSTransition
                  classNames="animation-fade"
                  timeout={500}
                  key={imgSrc}
                >
                  <img
                    className={cx('bg-img')}
                    src={imgSrc}
                    alt={'background-image'}
                    onClick={() => {
                      setShowSlider(true)
                    }}
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
                      預約房間
                    </SubmitButton>
                  </a>
                </div>
                <Carousel
                  imageUrl={room.imageUrl || []}
                  setImgSrc={setImgSrc}
                  color={'light-green'}
                />
              </div>
            </section>
            <main className={cx('room', ' col-md-7', 'col-12')}>
              <div className={cx('room-container')}>
                <h1 className={cx('room-name')}>
                  {room.name}
                  <RoomSize />
                </h1>
                <ul className={cx('room-time')}>
                  <li>
                    平日（一～四）價格：${room.normalDayPrice} /
                    假日（五〜日）價格： ${room.holidayPrice}
                  </li>
                  <li>
                    {' '}
                    <RoomSize />
                  </li>
                  <li>
                    入住時間：
                    <time>{room.checkInAndOut?.checkInEarly}</time>
                    （最早）/ <time>{room.checkInAndOut?.checkInLate}</time>
                    （最晚）
                  </li>
                  <li>
                    退房時間：<time>{room.checkInAndOut?.checkOut}</time>
                  </li>
                </ul>
                <ul className={cx('room-desc')}>
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
        </div>
      </RoomsContext.Provider>
    </BookingContext.Provider>
  )
}

RoomPage.propTypes = {
  match: PropTypes.any,
}

export default RoomPage
