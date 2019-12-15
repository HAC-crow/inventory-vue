<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="产品名称">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="出售人">
        <el-input v-model="form.sellUserName" />
      </el-form-item>
      <el-form-item label="重量（斤）">
        <el-input v-model="form.sellCount" />
      </el-form-item>
      <el-form-item label="总价（元）">
        <el-input v-model="form.sellPrice" />
      </el-form-item>
      <el-form-item label="购买人">
        <el-input v-model="form.buyUserName" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.buyUserPhoneNumber" placeholder="请输入手机号" type="tel" maxlength="11" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/get'

export default {

  data() {
    return {
      form: {
        productName: '',
        sellUserName: '',
        sellCount: '',
        sellPrice: '',
        buyUserName: '',
        buyUserPhoneNumber: '',
        desc: ''
      },
      result: false
    }
  },
  methods: {
    onSubmit() {
      create(this.form).then(response => {
        this.result = response.data
        if (this.result === true) {
          this.$message('添加成功!')
          this.$router.push({ path: '/purchase/see' })
        } else {
        //   this.$message({ message: '添加失败，具体原因请联系管理员!', type: 'warning'} )
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/purchase/see' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
