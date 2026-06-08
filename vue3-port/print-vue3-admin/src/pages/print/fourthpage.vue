<template>
  <div class="print-page">
    <h2 class="title">打印末页 - 经营地块情况（带填表机关）</h2>

    <div class="form-block">
      <Form :model="form" :label-width="120">
        <FormItem label="填表机关">
          <Input v-model="form.agency" placeholder="如：恩施市农业农村局" />
        </FormItem>
        <FormItem label="填表人">
          <Input v-model="form.filler" placeholder="请输入填表人" />
        </FormItem>
        <FormItem label="审核人">
          <Input v-model="form.reviewer" placeholder="请输入审核人" />
        </FormItem>
        <FormItem label="填表日期">
          <DatePicker v-model="form.date" type="date" placeholder="请选择日期" style="width: 100%;" />
        </FormItem>
        <FormItem label="备注说明">
          <Input v-model="form.remark" type="textarea" :rows="3" />
        </FormItem>
      </Form>
    </div>

    <div class="actions">
      <Button type="primary" @click="print">打印此页</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Message } from 'view-design-plus'

const form = reactive({
  agency: '恩施市农业农村局',
  filler: '',
  reviewer: '',
  date: new Date().toISOString().slice(0, 10),
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
  max-width: 720px;
  margin: 0 auto;
}
.actions {
  text-align: center;
  margin-top: 16px;
}
</style>
