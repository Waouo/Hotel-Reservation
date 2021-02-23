import { useContext} from 'react'
import styles from './Calendar.scss'
import classNames from 'classnames/bind'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import dayjs from 'dayjs'
import { BookingContext } from '../../contexts'

const cx = classNames.bind(styles)

const tomorrow = dayjs().startOf('day').add(1, 'day')

const Calendar = () => {
  const { state, setState, bookingArr } = useContext(BookingContext)

  return (
    <>
      {state && (
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
      )}
    </>
  )
}

export default Calendar
