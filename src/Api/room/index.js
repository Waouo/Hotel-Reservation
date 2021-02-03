import axios from 'axios';

const URL = 'https://challenge.thef2e.com/api/thef2e2019/stage6'

const roomRequest = axios.create({
  baseURL: `${URL}`,
  headers: {
    Authorization: `Bearer ${process.env.MY_F2E_TOKEN}`,
    Accept: 'application/json',
  },
})

export const getRoomsApi = () => roomRequest.get('/rooms')
export const getRoomDetailsApi = (id) => roomRequest.get(`/room/${id}`)
export const reservedRoomApi = (id, data) => roomRequest.post(`/room/${id}`, data)
export const deleteRoomsApi = () => roomRequest.delete(`/rooms`)
