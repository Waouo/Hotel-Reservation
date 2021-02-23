import * as Yup from 'yup'

export default Yup.object({
  name: Yup.string().required('請輸入姓名'),
  tel: Yup.number()
    .test(
      'len',
      '請輸入輸入10碼手機號碼',
      (val) => val.toString().length === 10
    )
    .typeError('請輸入正確的手機號碼格式')
    .required('請輸入手機號碼'),
})
