import { useEffect, useState } from 'react'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import styles from './Home.scss'
import { SlideItemsContext } from '../../contexts'
import bgImagesPath from './bgImagesPath'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import Footer from '../../components/Footer'

const HomePage = () => {
  const [bgNum, setBgNum] = useState(0)
  const [homeStyle, setHomeStyle] = useState({
    backgroundImage: `url(${bgImagesPath[bgNum]})`,
  })
  let srcBg = bgImagesPath[bgNum]

  useEffect(() => {
    setHomeStyle({
      backgroundImage: `url(${bgImagesPath[bgNum]})`,
    })
  }, [bgNum])

  return (
    <div className={styles.home}>
      <TransitionGroup component={null}>
        <CSSTransition
          classNames="animation-fade"
          timeout={500}
          key={bgNum}
        >
            <img className={styles.bg} src={srcBg} />
        </CSSTransition>
      </TransitionGroup>

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
