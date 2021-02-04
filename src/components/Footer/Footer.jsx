import { useContext } from 'react'
import SlideItems from '../SlideItems'
import { SlideItemsContext } from '../../contexts'
import styles from './Footer.scss'

const Footer = () => {
  const { num, variable, setVariable } = useContext(
    SlideItemsContext
  )

  return (
    <footer>
      <SlideItems
        num={num}
        variable={variable}
        setVariable={setVariable}
      />
      <span className={styles.copyright}>
        <sup>&copy;</sup>GAO SHAO WEI
      </span>
    </footer>
  )
}

export default Footer
