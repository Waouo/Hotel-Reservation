import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './Home.scss'
import classNames from 'classnames/bind'
import { CarouselContext } from '../../contexts'
import bgImagesPath from './bgImagesPath'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import loadable from '@loadable/component'
import { useState } from 'react'

const Footer = loadable(() => import('../../components/Footer'))

const cx = classNames.bind(styles)

const HomePage = () => {
  const [imgSrc, setImgSrc] = useState('')

  return (
    <div className={cx('home')}>
      <TransitionGroup component={null}>
        <CSSTransition classNames="animation-fade" timeout={500} key={imgSrc}>
          <img className={cx('bg-img')} src={imgSrc} />
        </CSSTransition>
      </TransitionGroup>

      <div className={cx('home-container', 'row')}>
        <Sidebar />
        <Gallery />
        <CarouselContext.Provider
          value={{
            imageUrl: bgImagesPath,
            setImgSrc,
          }}
        >
          <Footer />
        </CarouselContext.Provider>
      </div>
    </div>
  )
}

export default HomePage
