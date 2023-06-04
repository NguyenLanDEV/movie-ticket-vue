<template>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '750px' }">
        <div class="editable-add-btn" style="margin-bottom: 8px">
          <a-button type="primary" @click="dialog.showModal()">Add Cinema</a-button>
          <a-modal v-model:visible="dialog.visible" :title="dialog.title" width="800px">
            <CinemaCreate ref="createComponent" :rules="rules" :formErrors="formErrors"></CinemaCreate>
            <template #footer>
              <a-button key="back" @click="dialog.closeModal()">Return</a-button>
              <a-button key="submit" type="primary" :loading="loading" @click.prevent="submitCreateEvent">Submit</a-button>
            </template>
          </a-modal>
  
          <a-modal v-model:visible="updateDialog.visible" :title="updateDialog.title" width="800px" :key="movieId">
            <CinemaUpdate ref="updateComponent" :rules="rulesUpdate"  :formErrors="formErrors">
            </CinemaUpdate>
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
  import { defineComponent, onBeforeMount,  ref, toRaw,  } from 'vue'
  import { useModalStore } from '@/stores/modal'
  import { notification } from 'ant-design-vue';
  import CinemaUpdate from "./CinemaUpdate.vue"
  import CinemaCreate from "./CinemaCreate.vue"
  import {getCinemaList} from "@/data/Cinema.data"
  import type { Rule } from 'ant-design-vue/es/form';
  import type { IconType } from 'ant-design-vue/lib/notification/index'
  
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '15%'
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '15%'
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: '10%'
    },
    {
      title: 'address',
      dataIndex: 'address'
    },
    {
      title: 'city',
      dataIndex: 'city'
    },
    {
      title: 'clusterId',
      dataIndex: 'clusterId'
    },
    {
      title: 'operation',
      dataIndex: 'operation'
    }
  ]
  
  export default defineComponent({
    components:{ CinemaUpdate, CinemaCreate},
    setup() {
      const loading = ref<boolean>(false)
      const dataSource = ref()
      const modalStore = useModalStore()
      const createComponent = ref<any>();
      const updateComponent = ref<any>();
      // register dialog
      const dialog = modalStore.registerModal("Add", 'CREATE')
      const updateDialog = modalStore.registerModal('Update Cinema', 'EDIT')

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
          duration: 1.5
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
          const formData = toRaw<any>(createComponent.value.formState)
          await createComponent.value.validateDialog()
      
  
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
      
      /* Life circle
      =================*/
      onBeforeMount(() => {
        getCinemaList().then(response => {
          dataSource.value = response.metadata
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
  