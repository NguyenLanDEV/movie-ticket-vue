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
  
          <a-modal v-model:visible="updateDialog.visible" :title="updateDialog.title" width="800px" :key="cinemaId">
            <CinemaUpdate ref="updateComponent" :rules="rulesUpdate"  :formErrors="formErrors" :cinemaId="cinemaId">
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
  import { message } from 'ant-design-vue';
  import CinemaUpdate from "./CinemaUpdate.vue"
  import CinemaCreate from "./CinemaCreate.vue"
  import {getCinemaList, createCinema, deleteCinema, updateCinema} from "@/data/Cinema.data"
  import {TypeError} from "@/util/common"
  import type { Rule } from 'ant-design-vue/es/form';
  
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
      let validatePhone = async (_rule: Rule, phone: string) => {
        let isValid: boolean = /^(84|0)+([0-9]{8,9})\b/g.test(phone);
        if(!isValid){
          return Promise.reject('Please input the *phone again');
        }
        return Promise.resolve();
      };
      let validateEmail = async (_rule: Rule, phone: string) => {
        let isValid: boolean = /^\S+@\S+\.\S+$/.test(phone);
        if(!isValid){
          return Promise.reject('Please input the *email again');
        }
        return Promise.resolve();
      };

  
      const rules: Record<string, Rule[]> = {
        name: [{ required: true, validator: validateName, trigger: 'change' }],
        description: [{ required: true, validator: validateDescription, trigger: 'change' }],
        address: [{ required: true, message: "Please input the *address again", trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        clusterId: [{required: true, message:"please choose again", trigger: 'change' }],
      };
  
      const rulesUpdate: Record<string, Rule[]> = {
        name: [{ required: true, validator: validateName, trigger: 'change' }],
        description: [{ required: true, validator: validateDescription, trigger: 'change' }],
        address: [{ required: true, message: "Please input the *address again", trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        clusterId: [{ message:"please choose again", trigger: 'change' }],
      };
      /* Function
      =================*/
  
      const cinemaId = ref();
      const edit = (id: string) => {
        cinemaId.value = id
        formErrors.value = []
        updateDialog.value.showModal()
      }
  
      const onDelete = async (key: string) => {
        try {
          await deleteCinema(key)
          const removeIndex = dataSource.value.findIndex((item: any) => item._id == key)
          dataSource.value.splice(removeIndex, 1)
          message.success('delete success')
        } catch (error: any) {
          handleError(error)
        }
      }
  
      const submitCreateEvent = async () => {
        if (!createComponent.value)
          return
        try {
          loading.value = true
          formErrors.value = []
          const formData = {...createComponent.value.formState}
          await createComponent.value.validate()
          const rs= await createCinema(formData)
          dataSource.value.push(rs.metadata)
          dialog.value.closeModal()
          message.success("create success")
        } catch (error: any) {          
          handleError(error)
        } finally {
          loading.value = false
        }
      }
  
      const submitUpdateEvent = async () => {
        if (!updateComponent.value)
          return
        try {
          loading.value = true
          const data = toRaw(updateComponent.value.formState)
          formErrors.value = []
          await updateCinema(data)
          const indexOf= dataSource.value.findIndex((item: any) => item._id == cinemaId.value)
          dataSource.value[indexOf] = {...data}
          updateDialog.value.closeModal()
          message.success('update success')
        } catch (error: any) {
          handleError(error)
        } finally {
          loading.value = false
        }
      }
      

      function handleError(error: any){
        if (error?.error == TypeError.Validate) {
            error.metadata.forEach((error: any) => {
              formErrors.value.push({ key: error.context.key, message: error.message })
            })
        }else if(error?.error == TypeError.Authenticate){
          console.log("need login");
        }else if(error?.error == TypeError.TokenExpired){
          console.log('expired token');
        }else if(error?.errorFields){
          //
        }else{
          message.error("Request Error!")
        }
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
        cinemaId,
        updateDialog,
        formErrors,
        edit,
        onDelete,
        submitCreateEvent,
        submitUpdateEvent,
      }
    }
  })
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  </style>
  