import { useEffect, useState, useContext } from 'react'
import styles from './Calendar.scss'
import classNames from 'classnames/bind'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import dayjs from 'dayjs'
import { BookingContext } from '../../contexts'

const cx = classNames.bind(styles)
const fmt = 'YYYY-MM-DD'
const tomorrow = dayjs().startOf('day').add(1, 'day')

const Calendar = () => {
  const { state, setState, days, setDays, bookingArr } = useContext(
    BookingContext
  )

  useEffect(() => {
    setState([
      {
        startDate: tomorrow.toDate(),
        endDate: tomorrow.add(1, 'day').toDate(),
        key: 'selection',
        isPickingStartDate: false,
        isPickingEndDate: false,
      },
    ])
  }, [setState])

  useEffect(() => {
    setDays(dayjs(state[0].endDate).diff(dayjs(state[0].startDate), 'day'))
    console.log(days)
  }, [state, days, setDays])

  useEffect(() => {
    console.log(bookingArr)
  }, [bookingArr])

  return (
    <DateRange
      className={cx('calendar')}
      disabledDates={bookingArr}
      displayMode={'dateRange'}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
      editableDateInputs={false}
      moveRangeOnFirstSelection={false}
      onChange={(item) => setState([item.selection])}
      ranges={state}
      rangeColors={['#38470b']}
      minDate={tomorrow.toDate()}
      maxDate={tomorrow.add(89, 'day').toDate()}
      months={2}
      direction="horizontal"
    />
  )
}

export default Calendar
