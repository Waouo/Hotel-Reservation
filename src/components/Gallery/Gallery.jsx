import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { RoomsContext } from '../../contexts'
import styles from './Gallery.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Gallery = () => {
  const { rooms, success } = useContext(RoomsContext)

  return (
    <section className={cx('gallery', 'col-12 ', 'col-xl-9')}>
      {success ? (
        Array.from(rooms).map((room) => (
          <Link key={room.id} to={`room/${room.id}`} className={cx('link')}>
            <img
              src={room.imageUrl}
              alt={room.name}
              className={cx('gallery-image')}
            />
            <span className={cx('hover')}>
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
