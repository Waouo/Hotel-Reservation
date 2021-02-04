import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames/bind'
import styles from './RoomPage.scss'
import PropTypes from 'prop-types'
import { getRoomDetailsApi } from '../../Api/room'
import Loading from '../../components/Loading'
import SlideItems from '../../components/SlideItems'

const cx = classNames.bind(styles)

const RoomPage = ({ match }) => {
  const [room, setRoom] = useState({})
  const [booking, setBooking] = useState({})
  const [success, setSuccess] = useState(false)
  const [bgNum, setBgNum] = useState(2)
  const [bgSrc, setBgSrc] = useState('')

  useEffect(() => {
    ;(async function () {
      try {
        const { data } = await getRoomDetailsApi(match.params.id)
        setRoom(data.room[0])
        setBooking(data.booking[0])
        setSuccess(data.success)
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
      {success ? (
        <div className={styles.roomDetails}>
          <section className={styles.panel}>
            <TransitionGroup component={null}>
              <CSSTransition
                classNames="animation-fade"
                timeout={500}
                key={bgNum}
              >
                <img className={styles.bg} src={bgSrc} />
              </CSSTransition>
            </TransitionGroup>
            <Link to="/" className={styles.prePage}>
              <span className={styles.arrow}> &lt; </span>查看其它房型
            </Link>
            <div className={styles.booking}>
              <div>
                <h2 className={styles.booking__price}>
                  <span>${room.normalDayPrice}</span>&nbsp; / &nbsp; 1晚
                </h2>
                <button className={styles.booking__button}>Booking now</button>
              </div>
              <SlideItems
                num={3}
                variable={bgNum}
                setVariable={setBgNum}
                color={'light-green'}
              />
            </div>
          </section>
          <main className={styles.info}>
            <div className={styles.info__container}></div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

RoomPage.propTypes = {
  match: PropTypes.any,
}

export default RoomPage
