import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import { SlideItemsContext } from '../../contexts'
import bgImages from './bgImages'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import Footer from '../../components/Footer'

const HomePage = () => {
  const [bgNum, setBgNum] = useState(0)
  const [homeStyle, setHomeStyle] = useState(bgImages[bgNum])

  useEffect(() => {
    setHomeStyle(bgImages[bgNum])
  }, [bgNum])

  return (
    <div className={styles.home} style={homeStyle}>
      <div className={styles.home__container}>
        <Sidebar />
        <Gallery />
      </div>
      <SlideItemsContext.Provider
        value={{
          num: 4,
          variable: bgNum,
          setVariable: setBgNum,
        }}
      >
        <Footer />
      </SlideItemsContext.Provider>
    </div>
  )
}

export default HomePage
