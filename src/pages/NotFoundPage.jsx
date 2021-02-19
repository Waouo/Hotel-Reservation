import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import dayjs from 'dayjs'

const fmt = 'YYYY-MM-DD'
const tomorrow = dayjs().startOf('day').add(1, 'day')

const NotFoundPage = () => {
  const [state, setState] = useState([
    {
      startDate: tomorrow.toDate(),
      endDate: tomorrow.add(1, 'day').toDate(),
      key: 'selection',
      isPickingStartDate: false,
      isPickingEndDate: false,
    },
  ])

  const [days, setDays] = useState('')

  useEffect(() => {
    const start = state[0].startDate
    const end = state[0].endDate
    setDays(dayjs(state[0].endDate).diff(dayjs(state[0].startDate), 'day'))
    console.log('////////////////////////////////////')
    console.log('start', dayjs(state[0].startDate))
    console.log('end', dayjs(state[0].endDate))
    console.log(dayjs(state[0].startDate).format(fmt))

    function getDate() {
      let start = dayjs(state[0].startDate)
      let end = dayjs(state[0].endDate)
      let newArr = [start.format(fmt)]

      while (start.format(fmt) !== end.format(fmt)) {
        start = start.add(1, 'day')
        newArr.push(start.format(fmt))
      }
      return newArr
    }
    console.log('getDate: ', getDate())
  }, [state, days])

  return (
    <div>
      <h1 className="a">Page Not Found</h1>
      <Link to="/">Go back to home</Link>
      <DateRange
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        editableDateInputs={false}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        rangeColors={['#38470b']}
        minDate={tomorrow.toDate()}
        maxDate={tomorrow.add(88, 'day').toDate()}
        months={2}
        direction="horizontal"
      />
    </div>
  )
}

export default NotFoundPage
