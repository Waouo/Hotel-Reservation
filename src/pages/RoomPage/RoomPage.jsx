import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './RoomPage.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { getRoomDetailsApi } from '../../Api/room'
import amenitiesCh from './amenities-Ch'
import Loading from '../../components/Loading'
import SlideItems from '../../components/SlideItems'
import Calendar from '../../components/Calendar'

const cx = classNames.bind(styles)

const RoomPage = ({ match }) => {
  const [room, setRoom] = useState({})
  const [booking, setBooking] = useState({})
  const [success, setSuccess] = useState(false)
  const [bgNum, setBgNum] = useState(0)
  const [bgSrc, setBgSrc] = useState('')

  useEffect(() => {
    ;(async function () {
      try {
        const { data } = await getRoomDetailsApi(match.params.id)
        setRoom(data.room[0])
        setBooking(data.booking[0])
        setSuccess(data.success)
        console.log(
          Object.keys(data.room[0].amenities).map(
            (x) => data.room[0].amenities[x]
          )
        )
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

  return (
    <>
      <div className={cx('roomDetails')}>
        <section className={cx('panel')}>
          <TransitionGroup component={null}>
            <CSSTransition
              classNames="animation-fade"
              timeout={500}
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
                <span>${room.normalDayPrice}</span>&nbsp; / &nbsp; 1晚
              </h2>
              <button className={cx('booking-button')}>Booking now</button>
            </div>
            <SlideItems
              num={3}
              variable={bgNum}
              setVariable={setBgNum}
              color={'light-green'}
            />
          </div>
        </section>
        <main className={cx('info')}>
          <div className={cx('info-container')}>
            <h1>1人・ 單人床・ 附早餐・衛浴1間・18平方公尺</h1>
            <ul className={cx('time')}>
              <li>平日（一～四）價格：1380 / 假日（五〜日）價格：1500</li>
              <li>入住時間：15：00（最早）/ 21：00（最晚）</li>
              <li>退房時間：10：00</li>
            </ul>
            <ul className={cx('description')}>
              <li>單人間僅供一位客人使用。</li>
              <li>臥室配有單人床和私人浴室。</li>
              <li>
                您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。
              </li>
              <li>房間裡有AC，當然還有WiFi。</li>
            </ul>
            <div className={cx('amenities')}>
              {room.amenities &&
                Object.keys(room.amenities).map((amenity, idx) => (
                  <div
                    key={idx}
                    className={cx('amenity', {
                      ok: room.amenities[amenity],
                    })}
                  >
                    <img src={`../../.././public/images/${amenity}.svg`} />
                    <p>{amenitiesCh[amenity]}</p>
                  </div>
                ))}
            </div>
            <div>
              <h2>空房間狀態查詢</h2>
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

RoomPage.propTypes = {
  match: PropTypes.any,
}

export default RoomPage
