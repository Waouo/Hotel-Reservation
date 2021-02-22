import styles from './Booking.scss'
import classNames from 'classnames/bind'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import validationSchema from './validationSchema'
import PropTypes from 'prop-types'
import SubmitButton from '../SubmitButton'
import Amenities from '../Amenities'

const cx = classNames.bind(styles)

const Booking = ({ showBooking, setShowBooking, room }) => {
  return (
    <div className={cx('booking-page', { show: showBooking })}>
      <div className={cx('booking-container')}>
        <button className={cx('exit')} onClick={() => setShowBooking(false)}>
          Ｘ
        </button>
        <section className={cx('user-info')}>
          <Formik
            initialValues={{
              name: '',
              phone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            {(formik) => (
              <Form
                noValidate
                onSubmit={formik.handleSubmit}
                className={cx('container')}
              >
                <label htmlFor="name">姓名</label>
                <Field
                  name="name"
                  type="text"
                  maxLength={20}
                  className={cx('user-input')}
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="name" />
                </div>
                <label htmlFor="phone">手機號碼</label>
                <Field
                  name="phone"
                  type="text"
                  maxLength={10}
                  className={cx('user-input')}
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="phone" />
                </div>
                <label htmlFor="phone">手機號碼</label>
                <Field
                  name="name"
                  type="text"
                  maxLength={20}
                  className={cx('user-input')}
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="name" />
                </div>
                <label htmlFor="phone">手機號碼</label>
                <Field
                  name="phone"
                  type="text"
                  maxLength={10}
                  className={cx('user-input')}
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="phone" />
                </div>
                <div className={cx('day')}>2天，1晚平日</div>
                <br />
                <div className={cx('price')}>
                  <p>總計</p>
                  <p>1366</p>
                </div>
                <SubmitButton background={'#949c7c'}>確認送出</SubmitButton>
                <div className={cx('remark')}>
                  此預約系統僅預約功能，並不會對您進行收費
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <section id="booking" className={cx('room-info')}>
          <div className={cx('container')}>
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
              <div className={cx('flow-chart', 'arrow')}>
                <div className={cx('flow-chart-icon-bg')}>
                  <img src="../../../public/images/note.svg" />
                </div>
                <div className={cx('flow-chart-des')}>送出線上預約單</div>
              </div>
              <div className={cx('flow-chart', 'arrow')}>
                <div className={cx('flow-chart-icon-bg')}>
                  <img src="../../../public/images/search.svg" />
                </div>
                <div className={cx('flow-chart-des')}>
                  <p>系統立即回覆是否預訂成功</p>
                  <p>並以簡訊發送訂房通知</p>
                  <p> (若未收到簡訊請來電確認)</p>
                </div>
              </div>
              <div className={cx('flow-chart')}>
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
          </div>
        </section>
      </div>
    </div>
  )
}

Booking.propTypes = {
  showBooking: PropTypes.bool.isRequired,
  setShowBooking: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
}

export default Booking
