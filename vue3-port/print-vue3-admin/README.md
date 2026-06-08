# 升级说明：从 print-vue2-iview-admin → print-vue3-admin

本仓库是 `dukelyuu/print-vue2-iview-admin` 的 Vue 3 升级版本。

## 🎯 升级目标
将基于 **Vue 2 + iView 2 + Webpack 2** 的打印管理系统升级到现代前端技术栈：
- **Vue 3.4+** (Composition API + `<script setup>`)
- **Vite 5** 替代 Webpack 2（构建速度提升 10x+）
- **View UI Plus** 替代 iView 2（iView 官方 Vue 3 兼容版）
- **Pinia** 替代 Vuex 2
- **Vue Router 4** 替代 Vue Router 2
- **ECharts 5** 替代 ECharts 3

## 🆚 主要变化

| 维度 | Vue 2 版（旧） | Vue 3 版（新） |
|------|---------------|---------------|
| 框架 | Vue 2.2.2 | Vue 3.4+ |
| 组件库 | iView 2.0-rc | View UI Plus 4.2+ |
| 状态管理 | Vuex 2 | Pinia 2 |
| 路由 | Vue Router 2 | Vue Router 4 |
| 构建 | Webpack 2 | Vite 5 |
| 代码风格 | Options API | Composition API + `<script setup>` |
| 路由懒加载 | `require([...])` | `() => import(...)` |
| Node 要求 | Node 4+ | Node 16+ |

## 🚀 快速开始

```bash
# 安装依赖（推荐使用 pnpm）
pnpm install
# 或 npm
npm install

# 启动开发服务器
pnpm dev
# 默认打开 http://localhost:8080

# 生产构建
pnpm build

# 预览构建结果
pnpm preview
```

## 📁 目录结构

```
print-vue3-admin/
├── index.html               # 入口 HTML
├── vite.config.js           # Vite 配置
├── package.json
└── src/
    ├── main.js              # 应用入口
    ├── App.vue              # 根组件
    ├── api/
    │   └── http.js          # Axios 封装
    ├── router/
    │   └── index.js         # 路由表
    ├── store/
    │   └── index.js         # Pinia store
    ├── mock/
    │   └── index.js         # Mock 数据
    └── pages/
        ├── Login.vue        # 登录页
        ├── Home.vue         # 工作台主页（含菜单/布局）
        ├── Main.vue
        ├── 404.vue
        ├── nav1/
        │   ├── Table.vue    # 表格示例
        │   ├── Form.vue     # 表单示例
        │   └── user.vue     # 用户管理
        ├── charts/
        │   └── echarts.vue  # ECharts 图表
        └── print/
            ├── index.vue    # 打印入口（Steps 步骤条）
            ├── firstpage.vue   # 打印首页
            ├── thirdpage.vue   # 第2页（地块表）
            └── fourthpage.vue  # 末页（填表机关）
```

## 🛠️ 关键迁移点

### 1. 入口文件
```js
// 旧 (main.js - Vue 2)
import Vue from 'vue'
import App from './App.vue'
new Vue({ el: '#app', render: h => h(App) })

// 新 (main.js - Vue 3)
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

### 2. 组件语法
```vue
<!-- 旧：Options API -->
<template><div>{{ msg }}</div></template>
<script>
export default { data() { return { msg: 'hello' } } }
</script>

<!-- 新：Composition API + <script setup> -->
<template><div>{{ msg }}</div></template>
<script setup>
import { ref } from 'vue'
const msg = ref('hello')
</script>
```

### 3. 路由懒加载
```js
// 旧
component: function (resolve) {
  require(["./pages/print/firstpage.vue"], resolve)
}

// 新
component: () => import('@/pages/print/firstpage.vue')
```

### 4. 状态管理
```js
// 旧 Vuex
import Vuex from 'vuex'
export default new Vuex.Store({ state, mutations, actions })

// 新 Pinia
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', { state, actions })
```

### 5. UI 组件
iView 4.x / View UI Plus API 与 iview2 高度兼容：
- `<i-col>` 保持原样（View UI Plus 仍支持）
- `<Menu>`, `<Form>`, `<Table>`, `<Steps>` 等组件 API 几乎未变
- 主题：保留 `iview.css` 风格

## 📦 打印证书核心业务流程

1. **登录**（`/login`）- 简单用户名密码校验
2. **工作台**（`/`）- 三栏布局：左侧菜单 + 顶部用户 + 中间内容
3. **打印证书**（`/print`）- Steps 步骤条 + 子路由
   - **page0** - 打印首页：承包方基本信息
   - **page1** - 第2页：经营地块列表（支持新增/编辑/删除）
   - **page2** - 末页：填表机关、填表人、日期
4. **打印** - 浏览器原生 `window.print()`

## 🔍 注意事项

1. iView 4 已改名 **View UI Plus**，包名 `view-design-plus`
2. Vue 3 不再支持 `i-col` 这种小写标签（仍兼容但建议大写）
3. 过滤器 `filter` 已废弃，Vue 3 改用 `computed` 或 `methods`
4. `Vue.prototype` 改为 `app.config.globalProperties`
5. `slot="..."` 改为 `<template #...>`

## 📜 License

MIT
