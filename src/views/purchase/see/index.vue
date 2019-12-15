<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="产品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker v-model="listQuery.date1" type="date" placeholder="日期" style="width: 200px;" />
      -
      <el-date-picker v-model="listQuery.date2" type="date" placeholder="日期" style="width: 200px;" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出Excel
      </el-button> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column label="出售人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sellUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量（斤）" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.sellCount }}
        </template>
      </el-table-column>
      <el-table-column label="总价（元）" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.sellPrice }}
        </template>
      </el-table-column>
      <el-table-column label="单价（元/斤）" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.sellPrice/scope.row.sellCount }}
        </template>
      </el-table-column>
      <el-table-column label="购买人" align="center">
        <template slot-scope="scope">
          {{ scope.row.buyUserName }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.buyUserPhoneNumber }}
        </template>
      </el-table-column>
      <el-table-column label="购买日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="padding: 30px 0; text-align: right;" @pagination="fetchData" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="form" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteById, update } from '@/api/get'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default {

  components: { Pagination },
  directives: { waves },

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
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
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        date1: '',
        date2: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.rows
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      console.log(123)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          console.log(tempData)
          update(tempData).then(response => {
            this.result = response.data
            if (this.result === true) {
              this.$message('修改成功!')
              this.$router.push({ path: '/purchase/see' })
              this.fetchData()
              this.dialogFormVisible = false
            } else {
              this.$message('修改失败，请联系管理员!')
            }
          })
        }
      })
    },
    deleteById(id) {
      deleteById(id).then(response => {
        this.result = response.data
        if (this.result === true) {
          this.$message('删除成功!')
          this.fetchData()
        } else {
        //   this.$message({ message: '添加失败，具体原因请联系管理员!', type: 'warning'} )
        }
      })
    }
  }
}
</script>
