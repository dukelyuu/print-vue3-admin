<template>
  <div>
    <h2>表格示例</h2>
    <Table :columns="columns" :data="data" border stripe></Table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age', sortable: true },
  { title: '地址', key: 'address' }
]

const data = reactive([
  { name: '张三', age: 28, address: '恩施市' },
  { name: '李四', age: 32, address: '武汉市' },
  { name: '王五', age: 45, address: '宜昌市' }
])
</script>
