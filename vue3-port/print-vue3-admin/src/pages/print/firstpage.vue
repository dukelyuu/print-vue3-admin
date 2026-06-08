<template>
  <div class="print-page">
    <h2 class="title">打印首页 - 经营地块登记</h2>
    <Form :model="form" :label-width="120" class="form-block">
      <Row :gutter="16">
        <i-col span="12">
          <FormItem label="承包方名称">
            <Input v-model="form.ownerName" placeholder="请输入承包方名称" />
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="身份证号">
            <Input v-model="form.idCard" placeholder="请输入身份证号" />
          </FormItem>
        </i-col>
      </Row>
      <Row :gutter="16">
        <i-col span="12">
          <FormItem label="联系电话">
            <Input v-model="form.phone" placeholder="请输入联系电话" />
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="家庭住址">
            <Input v-model="form.address" placeholder="请输入家庭住址" />
          </FormItem>
        </i-col>
      </Row>
      <FormItem label="备注">
        <Input v-model="form.remark" type="textarea" :rows="3" />
      </FormItem>
    </Form>

    <div class="actions">
      <Button type="primary" @click="print">打印此页</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Message } from 'view-design-plus'

const form = reactive({
  ownerName: '',
  idCard: '',
  phone: '',
  address: '',
  remark: ''
})

function print() {
  Message.info('请使用浏览器打印功能：Ctrl/Cmd + P')
  window.print()
}
</script>

<style scoped>
.print-page {
  padding: 24px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
.form-block {
  max-width: 960px;
  margin: 0 auto;
}
.actions {
  text-align: center;
  margin-top: 16px;
}
</style>
