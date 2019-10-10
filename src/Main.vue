<template>
  <Table ref="myTable" border :data="data" :columns="realColumns">
    <!-- input -->
    <template slot="input" slot-scope="scope">
      <Input
        :value="scope.value"
        :disabled="scope.disabled"
        @on-blur="handleInputChange(scope.rowIndex,scope.key,$event)" />
    </template>
    <!-- number -->
    <template slot="number" slot-scope="scope">
      <InputNumber
        :value="scope.value"
        :disabled="scope.disabled"
        :editable="false"
        :min="scope.min"
        :max="scope.max"
        :step="scope.step"
        :precision="scope.precision"
        @on-change="handleInputNumberChange(scope.rowIndex,scope.key,$event)" />
    </template>
    <!-- select -->
    <template slot="select" slot-scope="scope">
      <Select
        :value="scope.value"
        :disabled="scope.disabled"
        @on-change="handleSelectChange(scope.rowIndex,scope.key,$event)">
        <Option
          v-for="(opt,index) in scope.options"
          :key="`options${index}`"
          :value="opt[scope.props?scope.props.value:'value']">
          {{opt[scope.props?scope.props.label:'label']}}
        </Option>
      </Select>
    </template>
    <!-- datePicker -->
    <template slot="datePicker" slot-scope="scope">
      <DatePicker
        :type="scope.pickerType"
        :value="scope.value"
        :format="scope.format"
        :multiple="scope.multiple"
        :placement="scope.placement"
        :placeholder="scope.placeholder"
        :show-week-numbers="scope.showWeekNumbers"
        :start-date="scope.startDate"
        :size="scope.size"
        :disabled="scope.disabled"
        :clearable="scope.clearable"
        :transfer="scope.transfer===false?false:true"
        @on-change="handleDatePickerChange(scope.rowIndex,scope.key,$event)" />
    </template>
    <!-- timePicker -->
    <template slot="timePicker" slot-scope="scope">
      <TimePicker
        :type="scope.pickerType"
        :value="scope.value"
        :format="scope.format"
        :steps="scope.steps"
        :placement="scope.placement"
        :placeholder="scope.placeholder"
        :size="scope.size"
        :disabled="scope.disabled"
        :clearable="scope.clearable"
        :transfer="scope.transfer===false?false:true"
        @on-change="handleTimePickerChange(scope.rowIndex,scope.key,$event)"/>
    </template>
    <!-- checkbox -->
    <template slot="checkbox" slot-scope="scope">
      <Checkbox
        :value="scope.value"
        :disabled="scope.disabled"
        :true-value="scope.trueValue"
        :false-value="scope.falseValue"
        @on-change="handleCheckboxChange(scope.rowIndex,scope.key,$event)"/>
    </template>
    <!-- checkboxGroup -->
    <template slot="checkboxGroup" slot-scope="scope">
      <CheckboxGroup :value="scope.value" @on-change="handleCheckboxGroupChange(scope.rowIndex,scope.key,$event)">
        <Checkbox
          v-for="(opt,index) in scope.options"
          :key="`option${index}`"
          :label="opt.value"
          :disabled="scope.disabled"
          :true-value="scope.trueValue"
          :false-value="scope.falseValue"
        >{{opt.label}}</Checkbox>
      </CheckboxGroup>
    </template>
    <!-- 操作 -->
    <template slot="action" slot-scope="scope">
      <template v-for="(button,index) in actions">
        <Button
          style="margin:0 3px"
          v-if="!button.confirm"
          :disabled="button.disabled?button.disabled(scope):false"
          :type="button.type"
          :size="button.size||'small'"
          :key="`button${index}`"
          @click="button.onClick(scope)">
          {{button.text}}
        </Button>
        <Poptip
          style="margin:0 3px"
          v-else
          confirm
          transfer
          :title="button.confirm.title"
          :placement="button.confirm.placement"
          :width="button.confirm.width"
          :ok-text="button.confirm.okText"
          :cancel-text="button.confirm.cancelText"
          :key="`button${index}`"
          @on-ok="button.onClick(scope)">
          <Button
            :disabled="button.disabled?button.disabled(scope):false"
            :type="button.type"
            :size="button.size||'small'">
            {{button.text}}
          </Button>
        </Poptip>
      </template>
    </template>
  </Table>
</template>

<script>

export default {
  name: 'edit-table',
  data() {
    return {
      realColumns: [], // 用来渲染的表格列
    };
  },
  props: {
    /** 表格的对齐方式，可选项：left、center（默认）、right */
    align: {
      type: String,
      default: 'center',
    },
    /** 是否显示序号列，默认不显示 */
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    /** 表格数据 */
    value: Array,
    /** 表格数据列配置 */
    columns: Array,
    /** 表格操作列配置 */
    actions: Array,
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    handleInputChange(rowIndex, key, event) {
      this.data[rowIndex][key] = event.target.value;
    },
    handleInputNumberChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    handleSelectChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    handleDatePickerChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    handleTimePickerChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    handleCheckboxChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    handleCheckboxGroupChange(rowIndex, key, val) {
      this.data[rowIndex][key] = val;
    },
    renderColumns(columns) {
      return columns.map(item => {
        if (item.children && item.children.length) { // 表头分组
          item.children = this.renderColumns(item.children);
        } else if(!item.render) {
          item.render = (h, params) => h('div', item.type ? this.$refs.myTable.$scopedSlots[item.type]({
            rowIndex: params.index,
            value: params.row[item.key],
            ...item,
          }) : params.row[item.key]);
        }
        const val = { align: this.align, ...item };
        return val;
      });
    },
    renderTable() {
      const tempColumns = this.renderColumns(this.columns);
      if (this.showIndexColumn) {
        this.realColumns = [{
          type: 'index', width: 72, align: this.align, title: '序号',
        }, ...tempColumns];
      } else {
        this.realColumns = tempColumns;
      }
      if (this.actions) {
        this.realColumns.push({
          key: 'action',
          title: '操作',
          width: 64 * this.actions.length + 24,
          align: this.align,
          render: (h, params) => h('div', this.$refs.myTable.$scopedSlots.action(params.row)),
        });
      }
    },
  },
  mounted() {
    this.renderTable();
  },
  watch: {
    data: {
      handler(val) {
        this.$emit('on-change', val);
      },
      deep: true
    }
  }
};
</script>
