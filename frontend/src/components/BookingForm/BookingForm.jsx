import { useContext, useState } from 'react'
import styles from './BookingForm.scss'
import validationSchema from './validationSchema'
import { BookingContext } from '../../contexts'
import { reservedRoomApi } from '../../Api/room'
import SubmitButton from '../SubmitButton'
import Loader from '../Loader'
import classNames from 'classnames/bind'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Calendar } from 'react-date-range'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useParams } from 'react-router'
import { CSSTransition } from 'react-transition-group'

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
    disabledDates,
    selectedDates,
    totalPrice,
  } = useContext(BookingContext)

  const setStartDate = (item) => {
    if (dayjs(item).isSameOrAfter(dayjs(state[0].endDate), 'day')) {
      setState([{ ...state[0], startDate: item, endDate: item }])
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
    <section className={cx('user-info', 'col-md-5', 'order-md-1', 'order-2')}>
      <Formik
        initialValues={{
          name: '',
          tel: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true)

          const data = JSON.stringify({ ...values, date: selectedDates })

          try {
            await reservedRoomApi(id, data)
            setIsSuccess(true)
          } catch (error) {
            setIsError(true)
          }

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
              autoFocus={true}
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
              <CSSTransition
                in={showStartCalendar}
                classNames="calender-fade"
                timeout={300}
                unmountOnExit
              >
                <Calendar
                  className={cx('calendar')}
                  minDate={tomorrow.toDate()}
                  maxDate={tomorrow.add(89, 'day').toDate()}
                  color="rgba(148, 156, 124, 0.8)"
                  date={state[0].startDate}
                  disabledDates={disabledDates}
                  onChange={(item) => setStartDate(item)}
                ></Calendar>
              </CSSTransition>
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
              <CSSTransition
                in={showEndCalendar}
                classNames="calender-fade"
                timeout={300}
                unmountOnExit
              >
                <Calendar
                  className={cx('calendar')}
                  minDate={dayjs(state[0].startDate).toDate()}
                  maxDate={tomorrow.add(89, 'day').toDate()}
                  color="rgba(148, 156, 124, 0.8)"
                  date={state[0].endDate}
                  disabledDates={disabledDates}
                  onChange={(item) => setEndDate(item)}
                ></Calendar>
              </CSSTransition>
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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <SubmitButton them={'border-light'}>確認送出</SubmitButton>
                <div className={cx('remark')}>
                  此預約系統僅預約功能，並不會對您進行收費
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </section>
  )
}

BookingForm.propTypes = {
  setIsSuccess: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
}

export default BookingForm
