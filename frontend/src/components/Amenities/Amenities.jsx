import styles from './Amenities.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import amenitiesCh from './amenities-Ch'

const cx = classNames.bind(styles)

const Amenities = ({ room, displayOnlyTrue, type }) => {
  return (
    <ul className={cx('amenities')}>
      {room.amenities &&
        Object.keys(room.amenities).map((amenity) => (
          <li
            key={amenity}
            className={cx(
              'amenity',
              { [`${type}`]: type },
              {
                ok: room.amenities[amenity],
              },
              { display__none: !room.amenities[amenity] && displayOnlyTrue }
            )}
          >
            <img src={require(`../../.././public/images/${amenity}.svg`)} />
            <p>{amenitiesCh[amenity]}</p>
          </li>
        ))}
    </ul>
  )
}

Amenities.propTypes = {
  room: PropTypes.object.isRequired,
  displayOnlyTrue: PropTypes.bool,
  type: PropTypes.string,
}

export default Amenities
