import styles from './Amenities.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import amenitiesCh from './amenities-Ch'

const cx = classNames.bind(styles)

const Amenities = ({ room, displayOnlyTrue, amenityStyle, type }) => {
  return (
    <div className={cx('amenities')}>
      {room.amenities &&
        Object.keys(room.amenities).map((amenity, idx) => (
          <div
            key={idx}
            className={cx(
              'amenity',
              `${type}`,
              {
                ok: room.amenities[amenity],
              },
              { display__none: !room.amenities[amenity] && displayOnlyTrue }
            )}
            style={amenityStyle}
          >
            <img src={`../../.././public/images/${amenity}.svg`} />
            <p>{amenitiesCh[amenity]}</p>
          </div>
        ))}
    </div>
  )
}

Amenities.propTypes = {
  room: PropTypes.object.isRequired,
  displayOnlyTrue: PropTypes.bool,
  amenityStyle: PropTypes.object,
  type: PropTypes.string,
}

export default Amenities
