import styles from './index.module.scss'

const Sidebar = () => {
  return (
    <header className={styles.sidebar}>
      <picture className={styles.logo}>
        <img src="../../../public/images/logo.3fafe707.svg" alt="hotel-log" />
      </picture>
      <address className={styles.info}>
        <h1 className={styles.title}>好室旅店。HOUSE HOTEL</h1>
        <p className={styles.address}>花蓮縣花蓮市國聯一路1號</p>
        <p className={styles.phone}>03-8321155</p>
        <p className={styles.email}>HOUSE@HOTEL.COM</p>
      </address>
    </header>
  )
}

export default Sidebar
