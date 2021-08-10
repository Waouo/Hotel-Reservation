import { useState, useEffect } from 'react'
import { getRoomDetailsApi } from '../Api/room'

const useGetRoomDetails = (matchParamsId) => {
  const [room, setRoom] = useState({})
  const [bookedDates, setBookedDates] = useState([])
  const [des, setDes] = useState({})
  const [success, setSuccess] = useState(false)

  //Get room details from Api
  useEffect(() => {
    async function getRoomDetails() {
      try {
        const { data } = await getRoomDetailsApi(matchParamsId)
        setRoom(data.room[0])
        setDes(data.room[0].descriptionShort)
        setBookedDates(data.booking)
        setSuccess(data.success)
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`)
      }
    }

    getRoomDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { room, bookedDates, des, success }
}

export default useGetRoomDetails
