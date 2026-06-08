<template>
  <div>
    <h2>表单示例</h2>
    <Form :model="form" :label-width="100" style="max-width: 600px;">
      <FormItem label="标题">
        <Input v-model="form.title" />
      </FormItem>
      <FormItem label="类型">
        <Select v-model="form.type">
          <Option value="1">耕地</Option>
          <Option value="2">林地</Option>
          <Option value="3">草地</Option>
        </Select>
      </FormItem>
      <FormItem label="日期">
        <DatePicker v-model="form.date" type="date" style="width: 100%;" />
      </FormItem>
      <FormItem label="备注">
        <Input v-model="form.remark" type="textarea" :rows="3" />
      </FormItem>
      <FormItem>
        <Button type="primary">提交</Button>
        <Button style="margin-left: 8px;">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  type: '1',
  date: '',
  remark: ''
})
</script>
