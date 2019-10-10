import editTable from './Main.vue'

editTable.install = Vue => {
  Vue.component(editTable.name, editTable)
}

export default editTable