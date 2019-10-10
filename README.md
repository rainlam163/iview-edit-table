# iview-edit-table

## 概述
`iview-edit-table`是基于`iview`组件库开发的可编辑表格，使用灵活的JSON配置去渲染组件，支持行操作。需要注意的是，`iview-edit-table`必须在安装了`iview`的基础上再安装使用。

## 安装
``` bash
npm install iview-edit-table --save
```

## 使用
``` vue
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
import EditTable from 'iview-edit-table'

export default {
  name: 'app',
  components: { EditTable },
  data() {
    return {
      data: [
        {
          name: 'John Brown',
          age: 18,
          gender: 1,
          marry: false,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
          hobby: [1, 2],
          person: []

        },
        {
          name: 'Jim Green',
          age: 24,
          gender: 1,
          marry: false,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
          hobby: [1],
          person: []
        },
        {
          name: 'Joe Black',
          age: 30,
          gender: 1,
          marry: true,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
          hobby: [1, 3],
          person: []
        },
        {
          name: 'Jon Snow',
          age: 26,
          gender: 0,
          marry: true,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
          hobby: [2, 3],
          person: []
        },
      ],
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
  }
}
</script>
```

## 说明
`iview-edit-table`内置支持的组件有`Input`、`InputNumber`、`Select`、`DatePicker`、`TimePicker`、`Checkbox`、`CheckboxGroup`，如有需要支持更多的组件，可联系作者，希望提出组件优化方向的建议。

## 联系
如有疑问，请联系邮件：490106135@qq.com
