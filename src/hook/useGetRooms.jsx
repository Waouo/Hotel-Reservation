import { useEffect, useState } from 'react'
import { getRoomsApi } from '../Api/room'

const useGetRooms = () => {
  const [rooms, setRooms] = useState({})
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    async function getRooms() {
      try {
        const { data } = await getRoomsApi()
        setRooms(data.items)
        setSuccess(data.success)
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`)
      }
    }

    getRooms()
  }, [])

  return { rooms, success }
}

export default useGetRooms
