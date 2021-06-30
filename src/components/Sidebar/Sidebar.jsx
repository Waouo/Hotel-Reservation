import styles from './Sidebar.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Sidebar = () => {
  return (
    <header className={cx('sidebar', 'col-12',' col-xl-3')}>
      <picture>
        <img
          className={cx('logo')}
          src={require("../../../public/images/logo.3fafe707.svg")}
          alt="hotel-log"
        />
      </picture>
      <address className={cx('info')}>
        <h1 className={cx('title')}>好室旅店。HOUSE HOTEL</h1>
        <p className={cx('address')}>花蓮縣花蓮市國聯一路1號</p>
        <p className={cx('phone')}>03-8321155</p>
        <p className={cx('email')}>HOUSE@HOTEL.COM</p>
      </address>
    </header>
  )
}

export default Sidebar
