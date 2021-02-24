import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './Home.scss'
import classNames from 'classnames/bind'
import { CarouselContext } from '../../contexts'
import bgImagesPath from './bgImagesPath'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import Footer from '../../components/Footer'

const cx = classNames.bind(styles)

const HomePage = () => {
  const [bgNum, setBgNum] = useState(0)
  let srcBg = bgImagesPath[bgNum]

  return (
    <div className={cx('home')}>
      <TransitionGroup component={null}>
        <CSSTransition classNames="animation-fade" timeout={1000} key={bgNum}>
          <img className={cx('bg')} src={srcBg} />
        </CSSTransition>
      </TransitionGroup>

      <div className={cx('home-container')}>
        <Sidebar />
        <Gallery />
        <CarouselContext.Provider
          value={{
            num: 4,
            variable: bgNum,
            setVariable: setBgNum,
          }}
        >
          <Footer />
        </CarouselContext.Provider> 
      </div>
    </div>
  )
}

export default HomePage
