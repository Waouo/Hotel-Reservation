import * as Yup from 'yup'

export default Yup.object({
  cardUserName: Yup.string().required('持卡人姓名需與信用卡姓名一致'),
})
