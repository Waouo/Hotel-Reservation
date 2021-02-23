import * as Yup from 'yup'

export default Yup.object({
  name: Yup.string().required('請輸入姓名'),
  tel: Yup.number().required('請輸入手機號碼').typeError('請輸入正確的手機號碼格式'),
})
