import * as Yup from 'yup'

export default Yup.object({
  name: Yup.string().required('請輸入姓名'),
  tel: Yup.string().test('tel', '請輸入輸入10碼手機號碼', function (val) {
    if (/\D/gi.test(val)) {
      return this.createError({ message: '請輸入正確的手機格式' })
    }

    if (val) {
      return val.toString().trim().length === 10
    }
  }),
})
