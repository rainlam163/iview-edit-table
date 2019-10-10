<template>
  <div id="app">
    <edit-table
      show-index-column
      v-model="data"
      :columns="columns"
      :actions="actions"
      @on-change="handleChange"
    >
    </edit-table>
  </div>
</template>

<script>
import EditTable from '../src'

export default {
  name: 'app',
  components: { EditTable },
  data() {
    return {
      data: [],
      columns: [
        {
          title: '基本信息',
          children: [
            {
              key: 'name',
              title: '姓名',
              width: 140,
            },
            {
              key: 'age',
              title: '年龄',
              width: 120,
              type: 'number',
            },
            {
              key: 'gender',
              title: '性别',
              type: 'select',
              width: 120,
              options: [{
                fdValue: 1, fdLabel: '男',
              }, {
                fdValue: 0, fdLabel: '女',
              }],
              props: { value: 'fdValue', label: 'fdLabel' },
            },
          ],
        },
        {
          key: 'marry',
          title: '是否已婚',
          width: 100,
          type: 'checkbox',
        },
        {
          key: 'address',
          title: '地址',
          type: 'input',
          minWidth: 200,
        },
        {
          key: 'date',
          title: '日期',
          width: 160,
          type: 'datePicker',
        },
        {
          key: 'hobby',
          title: '爱好',
          width: 300,
          type: 'checkboxGroup',
          options: [
            { label: '游泳', value: 1 },
            { label: '跑步', value: 2 },
            { label: '写代码', value: 3 },
          ],
        }
      ],
      actions: [
        {
          text: '详情',
          type: 'primary',
          onClick: row => {
            /* eslint-disable no-console */
            console.log(row)
          }
        },
        {
          text: '修改',
          type: 'primary',
          disabled: row => row.age > 24,
          onClick: row => {
            /* eslint-disable no-console */
            console.log(row)
          }
        },
        {
          text: '删除',
          type: 'warning',
          confirm: {
            title: '确认删除吗？',
          },
          disabled: row => row.age > 24,
          onClick: row => {
            /* eslint-disable no-console */
            console.log(row)
          }
        },
      ],
    }
  },
  methods: {
    handleChange(val) {
      /* eslint-disable no-console */
      console.log(val)
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        name: 'John Brown',
        age: 18,
        gender: 1,
        marry: false,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03',
        hobby: [1, 2],
        person: []
      })
    }
  }
}
</script>

<style scoped>
#app {
  padding: 12px;
}
</style>

