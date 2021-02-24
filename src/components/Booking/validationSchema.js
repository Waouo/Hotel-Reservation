import * as Yup from 'yup'

export default Yup.object({
  name: Yup.string().required('請輸入姓名'),
  tel: Yup.number()
    .test('tel', '請輸入輸入10碼手機號碼', (val) => {
      if (val) {
        return val.toString().length === 10
      }
    })
    .typeError('請輸入正確的手機號碼格式')
})
