<template>
  <div class="editable-add-btn" style="margin-bottom: 8px">
    <a-button type="primary" @click="showModal('CREATE')">Add Movie</a-button>
    <a-modal v-model:visible="dialog.visible" :title="dialog.title" width="800px" :key="dialog.type">
      <template v-if="dialog.type = 'CREATE'"> 
        <MovieCreate ref="formMovie" :rules="rules"></MovieCreate>
      </template>
      <template v-else-if="dialog.type = 'EDIT'"> 
        <MovieUpdate ref="formMovie" :rules="rules"></MovieUpdate>
      </template>

      <template #footer>
        <template v-if="dialog.type = 'CREATE'"> 
          <a-button key="back" @click="dialog.visible = false">Return</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click.prevent="submitCreateEvent">Submit</a-button>
        </template>
        <template v-else-if="dialog.type = 'EDIT'"> 
          <a-button key="back" @click="dialog.visible = false">Return</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click.prevent="submitUpdateEvent">Submit</a-button>
        </template>
      
      </template>
    </a-modal>
  </div>

  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span>
            <a @click="edit(record._id)">Edit</a>
            <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRaw } from 'vue'
import type { UnwrapRef } from 'vue'
import MovieCreate from './MovieCreate.vue'
import MovieUpdate from './MovieUpdate.vue'
import { useModalStore } from '@/stores/modal'
import { createMovie, getMovieList } from '@/data/Movie.data'
import type { MovieCreateRequest } from '@/type/Movie.type'
import type { Rule } from 'ant-design-vue/es/form';
import type { MovieCreateRef } from './MovieCreate.vue'
import type { ModalType } from '@/type/Common.type'

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
    title: 'description',
    dataIndex: 'description',
    width: '40%'
  },
  {
    title: 'operation',
    dataIndex: 'operation'
  }
]
interface DataItem {
  _id: string
  name: string
  age: number
  image: string
  description: string
  releaseTime: Date
}

export default defineComponent({
  components: {
    MovieCreate, MovieUpdate
  },
  setup() {
    const loading = ref<boolean>(false)
    const dataSource = ref()
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
    const modalStore = useModalStore()
    const dialog = modalStore.registerModal("Add", 'CREATE')
    const formMovie = ref<MovieCreateRef>();
    const dialogInfor = {
      title: {
        EDIT: "Update movie",
        CREATE: "Create movie",
        CUSTOM: ""
      }
    }
    /* Validation
    =================*/
    let validateName = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the *name again');
      }else {
        return Promise.resolve();
      }
    };
    let validateDescription = async (_rule: Rule, value: string) => {
      if (!value || value === '') {
        return Promise.reject('Please input the *description again');
      }else {
        return Promise.resolve();
      }
    };
    let validateAge = async (_rule: Rule, age: number) => {
      if(age <6 || age >18) {
        return Promise.reject("Please age between 6 and 18")
      }else if (age % 1 > 0) {
        return Promise.reject('Please enter a positive integer');
      }else {
        return Promise.resolve();
      }
    };
    let validateReleaseTime = async (_rule: Rule, releaseTime: any) => {
        let now = Date.now()
        if(!releaseTime) { 
          return Promise.reject('Please choose release time');
        }
        if(releaseTime < now){
          return Promise.reject('Release time must large now');
        }
        return Promise.resolve();
    };
    const rules: Record<string, Rule[]> = {
      name: [{ required: true, validator: validateName, trigger: 'change' }],
      description: [{required: true, validator: validateDescription, trigger: 'change' }],
      age: [{ validator: validateAge, trigger: 'change' }],
      releaseTime: [{ validator: validateReleaseTime, trigger: 'change' }],
    };

    /* Function
    =================*/
    const edit = (id: string) => {
      showModal('EDIT')
    }

    const onDelete = (key: string) => {
      // dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }

    const save = (key: string) => {
      // Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
      delete editableData[key]
    }
    const cancel = (key: string) => {
      delete editableData[key]
    }
    const showModal = (type: ModalType) => {
      dialog.value.title = dialogInfor.title[type]
      dialog.value.type = type
      dialog.value.visible = true
    }


    const submitCreateEvent = async () => {
      if (!formMovie.value) 
        return
      try {
        loading.value = true
        const formData: MovieCreateRequest = toRaw<MovieCreateRequest>(formMovie.value.formState)
        await formMovie.value.validateDialog()
        const resonse = await createMovie(formData)
        dataSource.value.push(formData)
        dialog.value.visible = false

      } catch (error) {
        console.log(error);
      }finally {
        loading.value = false
      }
    }

    const submitUpdateEvent = async () => {
      if (!formMovie.value) 
        return
      try {
        loading.value = true
        const formData: MovieCreateRequest = toRaw<MovieCreateRequest>(formMovie.value.formState)
        await formMovie.value.validateDialog()
        const resonse = await createMovie(formData)
        dataSource.value.push(formData)
        dialog.value.visible = false
      } catch (error) {
        console.log(error);
      }finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      // visibleModal.value = false
    }

    /* Life circle
    =================*/
    onBeforeMount(() => {
      getMovieList().then(result => {
        dataSource.value = result.metadata
      })
    })
    
    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      loading,
      dialog,
      formMovie,
      rules,
      edit,
      save,
      cancel,
      onDelete,
      showModal,
      submitCreateEvent,
      submitUpdateEvent,
      handleCancel,
    }
  }
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
