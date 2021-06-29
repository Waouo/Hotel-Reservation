import { useContext } from 'react'
import { RoomsContext } from '../../contexts'

const RoomSize = () => {
  const { des } = useContext(RoomsContext)

  return (
    <>
      {des && (
        <span>
          {des.GuestMin === des.GuestMax
            ? '1'
            : `${des.GuestMin || ''} ~ ${des.GuestMax || ''}`}
          人・ {des.Bed && `${des.Bed.length}`}張床・ 附早餐・衛浴
          {des['Private-Bath']}間・{des.Footage}
          平方公尺
        </span>
      )}
    </>
  )
}

export default RoomSize
