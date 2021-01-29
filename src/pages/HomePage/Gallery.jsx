import { useEffect, useState, useContext } from 'react'
import { RoomsContext } from '../../contexts'
import styles from './index.module.scss'

const Gallery = () => {
  const { rooms, success } = useContext(RoomsContext)

  useEffect(() => {
    console.log('Gallery', rooms)
  })

  return (
    <section className={styles.gallery}>
      {success ? (
        <h2>Can not get information of rooms from api.</h2>
      ) : (
        <div></div>
      )}
    </section>
  )
}

export default Gallery
