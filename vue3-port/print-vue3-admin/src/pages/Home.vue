<template>
  <Layout class="layout" :class="{ 'layout-hide-text': spanLeft < 5 }">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu
          :mode="modeType"
          theme="dark"
          width="auto"
          :active-name="$route.path"
          :open-names="openNames"
          @on-select="menuSelect"
        >
          <div class="layout-logo-left">
            <Icon type="paper-airplane" :size="logoSize" v-show="logoIsDisplay" />
            <span class="layout-text">三权分置管理系统</span>
          </div>
          <template v-for="item in $router.options.routes" v-if="!item.hidden">
            <Submenu :name="item.name" v-if="!item.leaf">
              <template #title>
                <Icon :type="item.iconCls" :size="iconSize" />
                <span class="layout-text">{{ item.name }}</span>
              </template>
              <template v-for="child in item.children" v-if="!child.hidden">
                <MenuItem :name="child.path" v-if="!child.leaf">
                  <Icon :type="child.iconCls" :size="iconSize" />
                  <span class="layout-text">{{ child.name }}</span>
                </MenuItem>
                <MenuItem :name="item.children[0].path" v-else>
                  <Icon :type="item.iconCls" :size="iconSize" />
                  <span class="layout-text">{{ item.children[0].name }}</span>
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32" />
          </i-button>
          <div class="userinfo">
            <Dropdown placement="bottom-end">
              <span class="head-img">
                {{ curUserName }}
                <img src="@/assets/user.jpg" />
              </span>
              <template #list>
                <DropdownItem @click.native="modifyPassword">修改密码</DropdownItem>
                <DropdownItem divided @click.native="logout">退出登录</DropdownItem>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="#">首页</BreadcrumbItem>
            <BreadcrumbItem>{{ $route.name }}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view />
          </div>
        </div>
      </i-col>
    </Row>

    <Modal v-model="modal1" title="修改密码" @on-ok="confirmModifyPS" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="原密码" prop="oldPassword">
          <Input v-model="formValidate.oldPassword" placeholder="请输入原密码" />
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input v-model="formValidate.newPassword" placeholder="请输入新密码" />
        </FormItem>
        <FormItem label="确认新密码" prop="resetPassword">
          <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码" />
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Message } from 'view-design-plus'

const router = useRouter()
const route = useRoute()

const openNames = ref([route.matched[0]?.name])
const spanLeft = ref(5)
const spanRight = ref(19)
const logoIsDisplay = ref(false)
const logoSize = ref(0)
const iconSize = ref(14)
const modal1 = ref(false)
const curUserName = ref('')
const formValidate = reactive({
  oldPassword: '',
  newPassword: '',
  resetPassword: ''
})
const ruleValidate = {
  oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
  newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
  resetPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
}

const modeType = computed(() => (spanLeft.value === 5 ? 'vertical' : 'horizontal'))

function toggleClick() {
  if (spanLeft.value === 5) {
    spanLeft.value = 1
    spanRight.value = 23
  } else {
    spanLeft.value = 5
    spanRight.value = 19
  }
}

function menuSelect(name) {
  router.push({ path: name })
}

function modifyPassword() {
  modal1.value = true
}

function logout() {
  router.push('/login')
}

function confirmModifyPS() {
  return false
  // 实际业务中调用修改密码接口
}

function cancel() {
  Message.info('已取消')
}

onMounted(() => {
  const u = sessionStorage.getItem('user')?.replace(/"/g, '') || ''
  curUserName.value = u
})
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: auto;
  background: #fff;
  border-radius: 4px;
  height: 80%;
}
.layout-content-main {
  padding: 10px;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #fff;
}
.layout-logo-left {
  width: 90%;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  text-align: center;
  /* background: #5b6270;
  border-radius: 3px;
  margin: 15px auto; */
}
.layout-text {
  color: #9ea7b4;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
.userinfo {
  display: inline-block;
  float: right;
  margin-right: 25px;
  margin-top: 22px;
}
.userinfo .ivu-dropdown {
  margin-top: 50px;
}
.head-img {
  border-radius: 20px;
  margin: 10px 0 10px 10px;
  width: 40px;
  height: 40px;
  float: right;
}
</style>
