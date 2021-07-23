import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './Home.scss'
import classNames from 'classnames/bind'
import { CarouselContext } from '../../contexts'
import bgImagesPath from './bgImagesPath'
import Sidebar from '../../components/Sidebar'
import Gallery from '../../components/Gallery'
import useBackGround from '../../hook/useBackGround'
import loadable from '@loadable/component'

const Footer = loadable(() => import('../../components/Footer'))

const cx = classNames.bind(styles)

const HomePage = () => {
  const bgObj = useBackGround(bgImagesPath)

  return (
    <div className={cx('home')}>
      <TransitionGroup component={null}>
        <CSSTransition
          classNames="animation-fade"
          timeout={1000}
          key={bgObj?.num}
        >
          <img className={cx('bg-img')} src={bgObj?.src} />
        </CSSTransition>
      </TransitionGroup>

      <div className={cx('home-container', 'row')}>
        <Sidebar />
        <Gallery />
        <CarouselContext.Provider
          value={{
            num: 4,
            variable: bgObj?.num,
            setVariable: bgObj?.setNum,
          }}
        >
          <Footer />
        </CarouselContext.Provider>
      </div>
    </div>
  )
}

export default HomePage
