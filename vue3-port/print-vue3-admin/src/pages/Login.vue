<template>
  <div class="login">
    <Card class="login-card">
      <h2 slot="title">恩施市农村三权分置管理系统</h2>
      <Form ref="formRef" :model="form" :rules="rules" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="form.username" placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="form.password"
            type="password"
            placeholder="密码需大于 6 个字符"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit" long>登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from 'view-design-plus'

const router = useRouter()
const formRef = ref(null)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { type: 'string', min: 6, message: '密码至少 6 位', trigger: 'blur' }
  ]
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      sessionStorage.setItem('user', JSON.stringify({ username: form.username }))
      Message.success('登录成功')
      router.push('/print')
    } else {
      Message.error('表单校验失败')
    }
  })
}
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #464c5b 0%, #2b3a55 100%);
}
.login-card {
  width: 380px;
}
</style>
