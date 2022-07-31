<template>
  <el-card class="box-card">
    <el-form :inline="true" ref="ruleFormRef" :model="ruleForm" label-width="80px">

      <TreeComp :data="ruleForm.data" :level="0" @addMember="addMember" />
      <div class="left">
        <el-form-item>
          <el-button type="primary" plain @click="addOrg">添加组织</el-button>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>

    </el-form>

  </el-card>
</template>

<script setup lang="ts">
import TreeComp from './TreeComp.vue'
import orgs from '../data/orgs.json'
import members from '../data/members.json'
import { toRefs, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

console.log(orgs)
interface memb {
  id?: number,
  name: string,
  age: number,
  status1: boolean,
  status2: boolean,
}
interface treeData {
  parent?: any
  id?: number,
  name: string,
  members?: Array<[]>,
  memberList: memb[] | null;
  child?: treeData[] | [];
}
const data: treeData[] = reactive([])

orgs.forEach((item: treeData) => {
  item.child = []
  item.memberList = []
  members.forEach((m: { id: string }) => {
    if (item.members && item.members.includes(m.id)) {
      item.memberList.push(m)
    }
  })
  orgs.forEach((v: { parent: any }) => {
    if (v.parent === item.id) {
      item.child.push(v)
    }
  })
  if (!item.parent) {
    data.push(item)
  }
})
console.log(data, '===')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  data
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const addOrg = () => {
  console.log('add', data)
  data.push({
    id: Date.now(),
    name: 'XX',
    memberList: [],
    child: []
  })
}
const addMember = (data, i) => {
  console.log(data, i)
  data[i].memberList.push({
    name: '',
    age: '',
    status1: '',
    status2: ''
  })
}
</script>

<style scoped>
.short-input {
  width: 100px;
}

.block-line {
  display: block;
}
</style>
