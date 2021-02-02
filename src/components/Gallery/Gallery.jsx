import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
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
          <Link key={room.id} to={`room/${room.id}`} className={styles.link}>
            <img
              src={room.imageUrl}
              alt={room.name}
              className={styles.gallery__image}
            />
            <span className={styles.hover}>
              <span>{room.name}</span>
            </span>
          </Link>
        ))
      ) : (
        <h2>Can not get information of rooms from api.</h2>
      )}
    </section>
  )
}

export default Gallery
