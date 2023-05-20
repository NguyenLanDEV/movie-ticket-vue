<template>
  <div class="editable-add-btn" style="margin-bottom: 8px" v-show="showModal">
    <a-button type="primary" @click="showModal">Add Movie</a-button>
    <a-modal v-model:visible="visible" title="Add" width="800px" @ok="handleOk">
      <MovieCreate></MovieCreate>
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import MovieCreate from '../../pages/movie/MovieCreate.vue'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%'
  },
  {
    title: 'operation',
    dataIndex: 'operation'
  }
]
interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
const data: DataItem[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
export default defineComponent({
  components: {
    MovieCreate
  },
  setup() {
    const loading = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const dataSource = ref(data)
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

    const edit = (key: string) => {
      visible.value = true
      // editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
    }

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }
    
    const save = (key: string) => {
      Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
      delete editableData[key]
    }
    const cancel = (key: string) => {
      delete editableData[key]
    }
    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        visible.value = false
      }, 2000)
    }

    const handleCancel = () => {
      visible.value = false
    }
    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      loading,
      visible,
      edit,
      save,
      cancel,
      onDelete,
      showModal,
      handleOk,
      handleCancel
    }
  }
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
