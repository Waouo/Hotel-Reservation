import {useState, useEffect} from 'react'

const useBackGround = (imageUrl) => {
  const [num, setNum] = useState(0)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (imageUrl) {
      imageUrl.forEach((imageUrl) => {
        let img = new Image()
        img.src = imageUrl
        img.rel= 'preload'
      })

      setSrc(imageUrl[num])
    }
  }, [num, imageUrl])

  return { num, setNum, src, setSrc }
}

export default useBackGround