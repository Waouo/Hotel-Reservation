import { useEffect } from 'react'
import styles from './index.module.scss'
import Sidebar from './Sidebar'
import Gallery from './Gallery'

const HomePage = () => {
  useEffect(() => {})

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <Sidebar />
        <Gallery/>
      </div>
    </div>
  )
}

export default HomePage
