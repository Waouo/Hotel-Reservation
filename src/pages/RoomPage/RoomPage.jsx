import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames/bind'
import styles from './RoomPage.scss'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { getRoomDetailsApi } from '../../Api/room'
import Carousel from '../../components/Carousel'
import Booking from '../../components/Booking'
import Amenities from '../../components/Amenities'
import Calendar from '../../components/Calendar'
import { BookingContext } from '../../contexts'

const cx = classNames.bind(styles)

const RoomPage = ({ match }) => {
  const [room, setRoom] = useState({})
  const [booking, setBooking] = useState([])
  const [des, setDes] = useState({})
  const [success, setSuccess] = useState(false)
  const [bgNum, setBgNum] = useState(0)
  const [bgSrc, setBgSrc] = useState('')
  const [showBooking, setShowBooking] = useState(false)
  //BookingContext
  const fmt = 'YYYY-MM-DD'
  const tomorrow = dayjs().startOf('day').add(1, 'day')
  const [dateArr, setDateArr] = useState([])
  const [weekArr, setWeekArr] = useState({})
  const [state, setState] = useState([
    {
      startDate: tomorrow.toDate(),
      endDate: tomorrow.toDate(),
      key: 'selection',
      isPickingStartDate: false,
      isPickingEndDate: false,
    },
  ])
  const [normalNights, setNormalNights] = useState(0)
  const [holidayNights, setHolidayNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const bookingArr = booking
    ? booking.map((x) => dayjs(x['date']).toDate())
    : []

  useEffect(() => {
    ;(async function () {
      try {
        const { data } = await getRoomDetailsApi(match.params.id)
        console.log(data.room[0])
        setRoom(data.room[0])
        setDes(data.room[0].descriptionShort)
        setBooking(data.booking)
        setSuccess(data.success)
        console.log(data)
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`)
      }
    })()
  }, [match.params.id])

  useEffect(() => {
    if (room.imageUrl) {
      setBgSrc(room.imageUrl[bgNum])
    }
  }, [bgNum, room.imageUrl, room])

  useEffect(() => {
    let start = dayjs(state[0].startDate),
      end = dayjs(state[0].endDate),
      dateArr = [start.format(fmt)],
      weekArr = [start.format('ddd')],
      normalNights = 0,
      holidayNights = 0

    while (start.format(fmt) !== end.format(fmt)) {
      start = start.add(1, 'day')
      dateArr.push(start.format(fmt))
      weekArr.push(start.format('ddd'))
    }

    for (let i in weekArr) {
      if (['Fri', 'Sat', 'Sun'].includes(weekArr[i])) {
        holidayNights += 1
      } else {
        normalNights += 1
      }
    }

    setDateArr(dateArr)
    setWeekArr(weekArr)
    setNormalNights(normalNights)
    setHolidayNights(holidayNights)
    setTotalPrice(
      room.normalDayPrice * normalNights + room.holidayPrice * holidayNights
    )
  }, [state, room.normalDayPrice, room.holidayPrice])

  return (
    <BookingContext.Provider
      value={{
        state,
        setState,
        normalNights,
        holidayNights,
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
            <Booking
              showBooking={showBooking}
              setShowBooking={setShowBooking}
              room={room}
            />
          </CSSTransition>
        </TransitionGroup>

        <section className={cx('panel')}>
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="animation-fade"
              timeout={1000}
              key={bgNum}
            >
              <img className={cx('bg')} src={bgSrc} alt={'background-image'} />
            </CSSTransition>
          </TransitionGroup>
          <Link to="/" className={cx('prePage')}>
            <span className={cx('arrow')}> &lt; </span>查看其它房型
          </Link>
          <div className={cx('booking')}>
            <div>
              <h2 className={cx('booking-price')}>
                <span>${totalPrice}</span>
                &nbsp; / &nbsp; {normalNights + holidayNights}晚
              </h2>
              <a href="#booking" style={{ margin: '0 auto' }}>
                <button
                  className={cx('booking-button')}
                  onClick={() => setShowBooking(true)}
                >
                  Booking now
                </button>
              </a>
            </div>
            <Carousel
              num={3}
              variable={bgNum}
              setVariable={setBgNum}
              color={'light-green'}
            />
          </div>
        </section>
        <main className={cx('info')}>
          <div className={cx('info-container')}>
            <h1 className={cx('room-name')}>
              {room.name}

              <span>
                {(des.GuestMin === des.GuestMax) === 1
                  ? '1'
                  : `${des.GuestMin} ~ ${des.GuestMax}`}
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
                {(des.GuestMin === des.GuestMax) === 1
                  ? '僅供一位客人'
                  : `供${des.GuestMin}~${des.GuestMax}人使用`}
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
