<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <div class="logo" />
    <NavbarComponent page="MoviePage"></NavbarComponent>
  </a-layout-header>

  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <a-breadcrumb :style="{ margin: '16px 0' }">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '750px' }">
      <div class="editable-add-btn" style="margin-bottom: 8px">
        <a-button type="primary" @click="dialog.showModal()">Add Movie</a-button>
        <a-modal v-model:visible="dialog.visible" :title="dialog.title" width="800px">
          <MovieCreate ref="createComponent" :rules="rules" :formErrors="formErrors"></MovieCreate>
          <template #footer>
            <a-button key="back" @click="dialog.closeModal()">Return</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click.prevent="submitCreateEvent">Submit</a-button>
          </template>
        </a-modal>

        <a-modal v-model:visible="updateDialog.visible" :title="updateDialog.title" width="800px" :key="movieId">
          <MovieUpdate ref="updateComponent" :rules="rulesUpdate" :movie-id="movieId" :formErrors="formErrors">
          </MovieUpdate>
          <template #footer>
            <a-button key="back" @click="updateDialog.closeModal()">Return</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click.prevent="submitUpdateEvent">Submit</a-button>
          </template>
        </a-modal>
      </div>

      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span>
                <a @click="edit(record._id)">Edit</a>
                <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record._id)">
                  <a>Delete</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount,  ref, toRaw, provide, } from 'vue'
import MovieCreate from './MovieCreate.vue'
import MovieUpdate from './MovieUpdate.vue'
import { useModalStore } from '@/stores/modal'
import { createMovie, getMovieList, updateMovie, deleteMovie } from '@/data/Movie.data'
import { getMetadata } from '@/data/metadata.data'
import { notification } from 'ant-design-vue';
import NavbarComponent from "@/components/admin/navbarComponent.vue"
import type { MovieComponentRef, MovieCreateRequest, MovieUpdateRequest } from '@/type/Movie.type'
import type { Rule } from 'ant-design-vue/es/form';
import type { IconType } from 'ant-design-vue/lib/notification/index'

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
    MovieCreate, MovieUpdate, NavbarComponent
  },
  setup() {
    const loading = ref<boolean>(false)
    const dataSource = ref()
    const modalStore = useModalStore()
    const createComponent = ref<MovieComponentRef<any>>();
    const updateComponent = ref<MovieComponentRef<any>>();
    const metadata = ref();
    // register dialog
    const dialog = modalStore.registerModal("Add", 'CREATE')
    const updateDialog = modalStore.registerModal('Update movie', 'EDIT')

    /* Validation
    =================*/
    const formErrors = ref<any>([])
    let validateName = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the *name again');
      } else {
        return Promise.resolve();
      }
    };
    let validateDescription = async (_rule: Rule, value: string) => {
      if (!value || value === '') {
        return Promise.reject('Please input the *description again');
      } else {
        return Promise.resolve();
      }
    };
    let validateAge = async (_rule: Rule, age: number) => {
      if (age < 6 || age > 18) {
        return Promise.reject("Please age between 6 and 18")
      } else if (age % 1 > 0) {
        return Promise.reject('Please enter a positive integer');
      } else {
        return Promise.resolve();
      }
    };
    let validateReleaseTime = async (_rule: Rule, releaseTime: any) => {
      let now = Date.now()
      if (!releaseTime) {
        return Promise.reject('Please choose release time');
      }
      if (releaseTime < now) {
        return Promise.reject('Release time must large now');
      }
      return Promise.resolve();
    };

    const rules: Record<string, Rule[]> = {
      name: [{ required: true, validator: validateName, trigger: 'change' }],
      description: [{ required: true, validator: validateDescription, trigger: 'change' }],
      age: [{ validator: validateAge, trigger: 'change' }],
      releaseTime: [{ validator: validateReleaseTime, trigger: 'change' }],
    };

    const rulesUpdate: Record<string, Rule[]> = {
      name: [{ required: true, validator: validateName, trigger: 'change' }],
      description: [{ required: true, validator: validateDescription, trigger: 'change' }],
      age: [{ validator: validateAge, trigger: 'change' }],
    };
    /* Function
    =================*/
    const openNotificationWithIcon = (type: IconType, title: string, description?: string) => {
      notification.open({
        message: title,
        description: description,
        type: type,
        duration: null
      })
    };

    const movieId = ref();
    const edit = (id: string) => {
      movieId.value = id
      formErrors.value = []
      updateDialog.value.showModal()
    }

    const onDelete = async (key: string) => {
      // dataSource.value = dataSource.value.filter((item) => item.key !== key)
      try {
        const response = await deleteMovie(key)
        openNotificationWithIcon('success', 'delete success')
      } catch (error: any) {
        if (error.status != 500) {
          openNotificationWithIcon('error', error.message)
        } else {
          openNotificationWithIcon('error', "Request Error!")
        }
      }
    }

    const submitCreateEvent = async () => {
      if (!createComponent.value)
        return
      try {
        loading.value = true
        formErrors.value = []
        const formData = toRaw<MovieCreateRequest>(createComponent.value.formState)
        await createComponent.value.validateDialog()
        const response = await createMovie(formData)
        if (response.status == 201) {
          getMovieList().then(result => {
            dataSource.value = result.metadata
          })
          dialog.value.closeModal()
        }

      } catch (error: any) {
        if (error?.error == 'validation-001') {
          error.metadata.forEach((error: any) => {
            formErrors.value.push({ key: error.context.key, message: error.message })
          })
        }
      } finally {
        loading.value = false

      }
    }

    const submitUpdateEvent = async () => {
      if (!updateComponent.value)
        return
      try {
        loading.value = true
        formErrors.value = []
        const formData = toRaw<MovieUpdateRequest>(updateComponent.value.formState)
        await updateComponent.value.validateDialog()
        const response = await updateMovie(formData)

        if (response.status == 201) {
          getMovieList().then(result => {
            dataSource.value = result.metadata
          })
          updateDialog.value.closeModal()
        }
      } catch (error: any) {
        if (error?.error == 'validation-001') {
          error.metadata.forEach((error: any) => {
            formErrors.value.push(error.message)
          })
        }

      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      // visibleModal.value = false
    }

    provide('metadata', metadata)
    /* Life circle
    =================*/
    onBeforeMount(() => {
      getMovieList().then(result => {
        dataSource.value = result.metadata
      })
    })

    onBeforeMount(() => {
      getMetadata().then(response => {
        metadata.value = response
      })

    });

    return {
      dataSource,
      columns,
      editingKey: '',
      loading,
      dialog,
      createComponent,
      updateComponent,
      rules,
      rulesUpdate,
      movieId,
      updateDialog,
      formErrors,
      openNotificationWithIcon,
      edit,
      onDelete,
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
