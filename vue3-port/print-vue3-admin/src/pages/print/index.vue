<template>
  <div>
    <Steps :current="current" @click-step="onStepClick">
      <Step title="打印首页" content="首页" />
      <Step title="打印经营地块情况(带总面积)" content="第2页" />
      <Step title="打印末页(经营地块情况带填表机关)" content="第3页" />
    </Steps>

    <div style="min-height: 60vh;">
      <router-view />
    </div>

    <div style="margin-top: 16px; text-align: center;">
      <Button @click="prev" :disabled="current === 0">上一步</Button>
      <Button @click="next" type="primary" :disabled="current === 2" style="margin-left: 8px;">下一步</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const current = ref(0)
const message = ref('当前正在打印首页')

function prev() {
  if (current.value > 0) current.value--
}

function next() {
  if (current.value < 2) current.value++
}

function onStepClick(index) {
  current.value = index
}

watch(current, (val) => {
  router.push(`/print/page${val}`)
  const label = val === 0 ? '首' : val === 2 ? '末' : val
  message.value = `当前正在打印${label}页`
})

onMounted(() => {
  router.push(`/print/page${current.value}`)
})
</script>
