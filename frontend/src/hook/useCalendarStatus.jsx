import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

const useCalendarStatus = (booking) => {
  const fmt = 'YYYY-MM-DD'
  let tomorrow = dayjs().startOf('day').add(1, 'day')

  const [selectedDates, setSelectedDates] = useState([])
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

  const disabledDates = booking
    ? booking.map((x) => dayjs(x['date']).toDate())
    : []

  // Check the default selected date whether is booked date
  useEffect(() => {
    const bookMap = {}
    let defaultSelectedDate = dayjs().startOf('day').add(1, 'day')

    booking.forEach((booking) => {
      if (!bookMap[booking['date']]) {
        bookMap[booking['date']] = 1
      }
    })

    while (bookMap[defaultSelectedDate.format(fmt)]) {
      defaultSelectedDate = defaultSelectedDate.add(1, 'day')
    }

    setState([
      {
        startDate: defaultSelectedDate.toDate(),
        endDate: defaultSelectedDate.toDate(),
        key: 'selection',
        isPickingStartDate: false,
        isPickingEndDate: false,
      },
    ])
  }, [booking])

  useEffect(() => {
    let start = dayjs(state[0].startDate),
      end = dayjs(state[0].endDate),
      selectedDates = [start.format(fmt)],
      weekArr = [start.format('ddd')],
      normalNights = 0,
      holidayNights = 0

    // Compare string ex: 2021-8-10
    while (start.format(fmt) !== end.format(fmt)) {
      start = start.add(1, 'day')
      selectedDates.push(start.format(fmt))
      weekArr.push(start.format('ddd'))
    }

    for (let i in weekArr) {
      if (['Fri', 'Sat', 'Sun'].includes(weekArr[i])) {
        holidayNights += 1
      } else {
        normalNights += 1
      }
    }

    setSelectedDates(selectedDates)
    setWeekArr(weekArr)
    setNights({ normal: normalNights, holiday: holidayNights })
  }, [setNights, state])

  return {
    selectedDates,
    weekArr,
    state,
    nightsObj,
    disabledDates,
    setState,
    tomorrow,
  }
}

export default useCalendarStatus
