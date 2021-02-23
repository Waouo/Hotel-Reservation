import { useContext, useEffect, useState } from 'react'
import styles from './Booking.scss'
import classNames from 'classnames/bind'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import { Calendar } from 'react-date-range'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import validationSchema from './validationSchema'
import SubmitButton from '../SubmitButton'
import Amenities from '../Amenities'
import { BookingContext } from '../../contexts'

dayjs.extend(isSameOrAfter)

const cx = classNames.bind(styles)

const fmt = 'YYYY - MM - DD'

const tomorrow = dayjs().startOf('day').add(1, 'day')

const Booking = ({ showBooking, setShowBooking, room }) => {
  const {
    state,
    setState,
    normalNights,
    holidayNights,
    bookingArr,
    dateArr,
    totalPrice,
  } = useContext(BookingContext)

  const setStartDate = (item) => {
    if (dayjs(item).isSameOrAfter(dayjs(state[0].endDate), 'day')) {
      setState([
        { startDate: item, endDate: dayjs(item).add(1, 'day').toDate() },
      ])
    } else {
      setState([{ ...state[0], startDate: item }])
    }
  }

  const setEndDate = (item) => {
    setState([{ ...state[0], endDate: item }])
  }

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
                <label className={cx('user-label')} htmlFor="name">
                  姓名
                </label>
                <Field
                  name="name"
                  type="text"
                  maxLength={20}
                  className={cx('user-input')}
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="name" />
                </div>
                <label className={cx('user-label')} htmlFor="phone">
                  手機號碼
                </label>
                <Field
                  className={cx('user-input')}
                  name="phone"
                  type="text"
                  maxLength={10}
                  placeholder="09XXXXXXXX"
                />
                <div className={cx('errorMessage')}>
                  <ErrorMessage name="phone" />
                </div>
                <div style={{ position: 'relative' }}>
                  <label className={cx('user-label')} htmlFor="phone">
                    入住日期
                  </label>
                  <button
                    type="button"
                    className={cx('user-input', 'user-button')}
                  >
                    {state[0].startDate &&
                      dayjs(state[0].startDate).format(fmt)}
                  </button>
                  <div className={cx('errorMessage')}></div>
                  <Calendar
                    minDate={tomorrow.toDate()}
                    maxDate={tomorrow.add(89, 'day').toDate()}
                    color="rgba(148, 156, 124, 0.8)"
                    date={state[0].startDate}
                    onChange={(item) => setStartDate(item)}
                  ></Calendar>
                </div>
                <div style={{ position: 'relative' }}>
                  <label className={cx('user-label')} htmlFor="phone">
                    退房日期
                  </label>
                  <button
                    type="button"
                    className={cx('user-input', 'user-button')}
                  >
                    {state[0].endDate && dayjs(state[0].endDate).format(fmt)}
                  </button>
                  <div className={cx('errorMessage')}></div>
                  <Calendar
                    minDate={dayjs(state[0].startDate).add(1, 'day').toDate()}
                    maxDate={tomorrow.add(89, 'day').toDate()}
                    color="rgba(148, 156, 124, 0.8)"
                    date={state[0].endDate}
                    onChange={(item) => setEndDate(item)}
                  ></Calendar>
                </div>
                <div className={cx('day')}>
                  {normalNights + holidayNights + 1}天，
                  {normalNights >= 1 && `${normalNights}晚平日`}
                  {normalNights >= 1 && holidayNights >= 1 && '，'}
                  {holidayNights >= 1 && `${holidayNights}晚假日`}
                </div>
                <br />
                <div className={cx('price')}>
                  <p>總計 ${totalPrice}</p>
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
