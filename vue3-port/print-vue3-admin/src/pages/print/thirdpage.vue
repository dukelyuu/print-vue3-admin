<template>
  <div class="print-page">
    <h2 class="title">打印经营地块情况（带总面积）</h2>

    <Table :columns="columns" :data="data" border stripe class="form-block">
      <template #action="{ row, index }">
        <Button type="text" size="small" @click="editRow(index)">编辑</Button>
        <Button type="text" size="small" @click="removeRow(index)" style="color: #ed4014;">删除</Button>
      </template>
    </Table>

    <div style="margin: 16px auto 0; max-width: 960px;">
      <Button @click="addRow" type="dashed" icon="md-add" long>新增地块</Button>
    </div>

    <div class="actions">
      <span class="total">总面积: {{ totalArea.toFixed(2) }} 亩</span>
      <Button type="primary" @click="print">打印此页</Button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { Message } from 'view-design-plus'

const columns = [
  { title: '序号', type: 'index', width: 70 },
  { title: '地块编号', key: 'plotNo', width: 120 },
  { title: '地块名称', key: 'plotName', minWidth: 150 },
  { title: '地块类别', key: 'plotType', width: 120 },
  { title: '面积(亩)', key: 'area', width: 110 },
  { title: '四至-东', key: 'east', width: 100 },
  { title: '四至-南', key: 'south', width: 100 },
  { title: '四至-西', key: 'west', width: 100 },
  { title: '四至-北', key: 'north', width: 100 },
  { title: '操作', slot: 'action', width: 140 }
]

const data = reactive([
  {
    plotNo: 'DK-001',
    plotName: '示例地块 A',
    plotType: '耕地',
    area: 12.5,
    east: '张某', south: '道路', west: '李某', north: '沟渠'
  }
])

const totalArea = computed(() =>
  data.reduce((sum, item) => sum + Number(item.area || 0), 0)
)

function addRow() {
  data.push({
    plotNo: `DK-${String(data.length + 1).padStart(3, '0')}`,
    plotName: '',
    plotType: '',
    area: 0,
    east: '',
    south: '',
    west: '',
    north: ''
  })
  Message.success('已新增一行')
}

function editRow(index) {
  Message.info(`编辑第 ${index + 1} 行（占位）`)
}

function removeRow(index) {
  data.splice(index, 1)
  Message.success('已删除')
}

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
  max-width: 1080px;
  margin: 0 auto;
}
.actions {
  text-align: center;
  margin-top: 16px;
}
.total {
  margin-right: 16px;
  font-weight: 600;
}
</style>
