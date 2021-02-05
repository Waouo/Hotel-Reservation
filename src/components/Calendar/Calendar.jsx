import { useState } from 'react'
import styles from './Calendar.scss'
import classNames from 'classnames/bind'
import ReactCalendar from 'react-calendar'

const cx = classNames.bind(styles)

const Calendar = () => {
  const [value, onChange] = useState(new Date())

  return (
    <div>
      <ReactCalendar
        onChange={onChange}
        value={value}
        allowPartialRange={true}
      />
    </div>
  )
}

export default Calendar
