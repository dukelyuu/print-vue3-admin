<template>
  <div>
    <h2>用户管理</h2>
    <Table :columns="columns" :data="data" border stripe></Table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const columns = [
  { title: '账号', key: 'username' },
  { title: '姓名', key: 'name' },
  { title: '角色', key: 'role' },
  { title: '状态', key: 'status',
    render: (h, { row }) => h('span', row.status ? '启用' : '禁用')
  }
]

const data = reactive([
  { username: 'admin', name: '管理员', role: '超级管理员', status: true },
  { username: 'user1', name: '张三', role: '操作员', status: true }
])
</script>
