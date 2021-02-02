import { useEffect, useContext } from 'react'
import { RoomsContext } from '../../contexts'
import styles from './Gallery.module.scss'

const Gallery = () => {
  const { rooms, success } = useContext(RoomsContext)

  useEffect(() => {
    console.log('Gallery', rooms)
  })

  return (
    <section className={styles.gallery}>
      {success ? (
        Array.from(rooms).map((room) => (
          <picture key={room.id}>
            <img
              src={room.imageUrl}
              alt={room.name}
              className={styles.gallery__image}
            />
          </picture>
        ))
      ) : (
        <h2>Can not get information of rooms from api.</h2>
      )}
    </section>
  )
}

export default Gallery
