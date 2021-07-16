import DotLoader from 'react-spinners/DotLoader'

const Loader = () => {
  const style = {
    display: 'block',
    margin: '0 auto',
  }

  return (
    <>
      <DotLoader color={'white'} css={style} size={50} />
    </>
  ) 
}

export default Loader
