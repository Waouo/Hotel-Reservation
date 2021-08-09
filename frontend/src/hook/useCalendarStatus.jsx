import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

const useCalendarStatus = (booking) => {
  const fmt = 'YYYY-MM-DD'
  const tomorrow = dayjs().startOf('day').add(1, 'day')

  const [dateArr, setDateArr] = useState([])
  const [weekArr, setWeekArr] = useState({})
  const [nightsObj, setNights] = useState({ normal: 0, holiday: 0 })
  const [state, setState] = useState([
    {
      startDate: tomorrow.toDate(),
      endDate: tomorrow.toDate(),
      key: 'selection',
      isPickingStartDate: false,
      isPickingEndDate: false,
    },
  ])

  const bookingArr = booking
    ? booking.map((x) => dayjs(x['date']).toDate())
    : []

  useEffect(() => {
    let start = dayjs(state[0].startDate),
      end = dayjs(state[0].endDate),
      dateArr = [start.format(fmt)],
      weekArr = [start.format('ddd')],
      normalNights = 0,
      holidayNights = 0

    // Compare string ex: 2021-8-10
    while (start.format(fmt) !== end.format(fmt)) {
      start = start.add(1, 'day')
      dateArr.push(start.format(fmt))
      weekArr.push(start.format('ddd'))
    }

    for (let i in weekArr) {
      if (['Fri', 'Sat', 'Sun'].includes(weekArr[i])) {
        holidayNights += 1
      } else {
        normalNights += 1
      }
    }

    setDateArr(dateArr)
    setWeekArr(weekArr)
    setNights({ normal: normalNights, holiday: holidayNights })
  }, [state, setNights])

  return {
    dateArr,
    weekArr,
    state,
    nightsObj,
    bookingArr,
    setState,
    tomorrow,
  }
}

export default useCalendarStatus
