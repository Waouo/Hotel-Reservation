import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import dayjs from 'dayjs'

const NotFoundPage = () => {
  var xorOperation = function (n, start) {
    let result
    
    Array.from({ length: n }, (_, i) => start + 2 * i).forEach((val) => {
      if (!result) {
        result = val
      } else {
        result = result ^ val
      }
    })

    return result
  }
  console.log(xorOperation(4, 3))

  return (
    <div style={{ background: 'black' }}>
      <h1 className="a">Page Not Found</h1>
      <Link to="/">Go back to home</Link>
    </div>
  )
}

export default NotFoundPage
