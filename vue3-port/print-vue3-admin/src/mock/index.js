// 兼容 Vue 2 mockjs 用法（保持原有 mock 接口形态）
// Vue 3 项目中按需启用
import Mock from 'mockjs'

Mock.setup({ timeout: '200-600' })

Mock.mock(/\/api\/login/, 'post', (options) => {
  const body = JSON.parse(options.body || '{}')
  if (!body.username || !body.password) {
    return { code: 400, message: '用户名或密码不能为空' }
  }
  return {
    code: 200,
    data: {
      token: Mock.Random.guid(),
      username: body.username
    },
    message: 'ok'
  }
})

export default Mock
