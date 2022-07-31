<template>
  <div class="left " :class="level ? 'ml20' : ''">
    <vuedraggable v-model="rootData" group="people" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{ element: item, index }">
        <div class="border">
          <el-form-item label="名称" :prop="'data.' + index + '.name'" :rules="{
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          }">
            <el-input v-model="item.name" />
          </el-form-item>
            <div v-if="item.memberList.length>0">
                  <span class="th">姓名</span>
                  <span class="th">年龄</span>
                  <span class="th2"> 状态1</span>
                  <span class="th2">状态2</span>
                </div>
          <vuedraggable class="block-line" v-model="item.memberList" group="child" @start="drag = true"
            @end="drag = false" item-key="id">
            <template #item="{ element: m, index: i }">
              <div>
                <el-form-item :prop="'data.' + index + '.memberList.' + i + '.name'" :rules="{
                  required: true,
                  message: '请输入成员名称',
                  trigger: 'blur',
                }">
                  <el-input v-model="m.name" class="short-input" />
                </el-form-item>
                <el-form-item :prop="'data.' + index + '.memberList.' + i + '.age'" :rules="{
                  required: true,
                  message: '请输入成员age',
                  trigger: 'blur',
                }">
                  <el-input v-model="m.age" class="short-input" />
                </el-form-item>
                <el-form-item :prop="'data.' + index + '.memberList.' + i + '.status1'" :rules="{
                  required: true,
                  message: '请输入成员status',
                  trigger: 'change',
                }">
                  <el-checkbox v-model="m.status1" class="short-input" size="large" />
                </el-form-item>
                <el-form-item :prop="'data.' + index + '.memberList.' + i + '.status2'" :rules="{
                  required: true,
                  message: '请输入成员status2',
                  trigger: 'change',
                }">
                  <el-checkbox :disabled="!m.status1" v-model="m.status2" class="short-input" size="large" />

                </el-form-item>

              </div>
            </template>
          </vuedraggable>
          <el-button type="primary" plain @click="addMember(rootData, index)">添加用户</el-button>
          <div v-if="item.child">
            <TreeComp :data="item.child" :level="level + 1" @addMember="addMember" />
          </div>
        </div>
      </template>
    </vuedraggable>
  </div>
</template>

<script setup lang="ts">
import vuedraggable from 'vuedraggable'

import { defineProps, ref, defineEmits } from 'vue'
import TreeComp from './TreeComp.vue'
const drag = ref(false)
const emits = defineEmits(['addMember'])
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})
const rootData = ref(props.data)
const addMember = (rootData: any, index:number) => {
  emits('addMember', rootData, index)
}

</script>

<style scoped>
.th{
  display: inline-block;
  width:200px;
}
.th2{
  display: inline-block;
  width:5/*  */0px;
}
.left {
  text-align: left;
}

.ml20 {
  margin-left: 100px;
}

.border {
  padding: 10px;
  border: 1px solid #e3e5e9;
}
</style>
