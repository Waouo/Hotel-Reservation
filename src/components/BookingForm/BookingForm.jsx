import { useContext, useState } from 'react'
import styles from './BookingForm.scss'
import validationSchema from './validationSchema'
import { BookingContext } from '../../contexts'
import { reservedRoomApi } from '../../Api/room'
import SubmitButton from '../../components/SubmitButton'
import classNames from 'classnames/bind'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Calendar } from 'react-date-range'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useParams } from 'react-router'

const cx = classNames.bind(styles)

const fmt = 'YYYY - MM - DD'

dayjs.extend(isSameOrAfter)

const BookingForm = ({ setIsSuccess, setIsError }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  let { id } = useParams()

  const {
    state,
    setState,
    tomorrow,
    nightsObj,
    bookingArr,
    dateArr,
    totalPrice,
  } = useContext(BookingContext)

  const setStartDate = (item) => {
    if (dayjs(item).isSameOrAfter(dayjs(state[0].endDate), 'day')) {
      setState([{ startDate: item, endDate: item }])
    } else {
      setState([{ ...state[0], startDate: item }])
    }
    setShowStartCalendar(false)
  }

  const setEndDate = (item) => {
    setState([{ ...state[0], endDate: item }])

    setShowEndCalendar(!showEndCalendar)
  }

  const handleStartCalendar = () => {
    setShowStartCalendar(!showStartCalendar)
    setShowEndCalendar(false)
  }

  const handleEndCalendar = () => {
    setShowEndCalendar(!showEndCalendar)
    setShowStartCalendar(false)
  }

  return (
    <section className={cx('user-info', 'col-md-5', 'order-md-1','order-2')}>
      <Formik
        initialValues={{
          name: '',
          tel: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true)
          setIsError(false)

          const data = JSON.stringify({ ...values, date: dateArr })

          try {
            await reservedRoomApi(id, data)
            setIsSuccess(true)
          } catch (error) {
            setIsError(true)
          }

          setIsLoading(false)
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className={cx('user-container')}
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
            <label className={cx('user-label')} htmlFor="tel">
              手機號碼
            </label>
            <Field
              className={cx('user-input')}
              name="tel"
              type="text"
              maxLength={10}
              placeholder="09XXXXXXXX"
              onChange={(e) => {
                if (/\D/.test(e.target.value)) {
                  return
                }
                formik.setFieldValue('tel', e.target.value)
              }}
            />
            <div className={cx('errorMessage')}>
              <ErrorMessage name="tel" />
            </div>
            <div style={{ position: 'relative' }}>
              <label className={cx('user-label')}>入住日期</label>
              <button
                type="button"
                className={cx('user-input', 'user-button')}
                onClick={handleStartCalendar}
              >
                {state[0].startDate && dayjs(state[0].startDate).format(fmt)}
              </button>
              <div className={cx('errorMessage')}></div>
              <div
                className={cx('calendar', {
                  display: showStartCalendar,
                })}
              >
                <Calendar
                  minDate={tomorrow.toDate()}
                  maxDate={tomorrow.add(89, 'day').toDate()}
                  color="rgba(148, 156, 124, 0.8)"
                  date={state[0].startDate}
                  disabledDates={bookingArr}
                  onChange={(item) => setStartDate(item)}
                ></Calendar>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <label className={cx('user-label')}>退房日期</label>
              <button
                type="button"
                className={cx('user-input', 'user-button')}
                onClick={handleEndCalendar}
              >
                {state[0].endDate && dayjs(state[0].endDate).format(fmt)}
              </button>
              <div className={cx('errorMessage')}></div>
              <div className={cx('calendar', { display: showEndCalendar })}>
                <Calendar
                  className={cx('calendar')}
                  minDate={dayjs(state[0].startDate).add(1, 'day').toDate()}
                  maxDate={tomorrow.add(89, 'day').toDate()}
                  color="rgba(148, 156, 124, 0.8)"
                  date={state[0].endDate}
                  disabledDates={bookingArr}
                  onChange={(item) => setEndDate(item)}
                ></Calendar>
              </div>
            </div>
            <div className={cx('day')}>
              {nightsObj.normal + nightsObj.holiday}天，
              {nightsObj.normal >= 1 && `${nightsObj.normal}晚平日`}
              {nightsObj.normal >= 1 && nightsObj.holiday >= 1 && '，'}
              {nightsObj.holiday >= 1 && `${nightsObj.holiday}晚假日`}
            </div>
            <br />
            <div className={cx('price')}>
              <p>總計 ${totalPrice}</p>
            </div>
            <SubmitButton them={'border-light'}>確認送出</SubmitButton>
            <div className={cx('remark')}>
              {isLoading
                ? '處理中...'
                : '此預約系統僅預約功能，並不會對您進行收費'}
            </div>
            <div className={cx('remark')}></div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

BookingForm.propTypes = {
  roomId: PropTypes.string.isRequired,
  setIsSuccess: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
}

export default BookingForm
