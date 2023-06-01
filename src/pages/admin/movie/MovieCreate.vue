<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    <a-form-item label="Name movie" name="name" v-bind="validateInfos.name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Description" name="description" v-bind="validateInfos.description">
      <a-input v-model:value="formState.description" />
    </a-form-item>
    <a-form-item label="Age：" name="age"  v-bind="validateInfos.age">
      <a-input-number id="inputNumber" v-model:value="formState.age" :min="6" :max="18" />
    </a-form-item>
    <a-form-item label="Cast: " v-bind="validateInfos.casts">
      <a-select v-model:value="formState.casts" mode="tags" style="width: 100%" :token-separators="[',']"
        placeholder="Select Cast" :options="optionCast" @change="handleChangeCast"></a-select>
    </a-form-item>
    <a-form-item label="Director: " v-bind="validateInfos.directors">
      <a-select v-model:value="formState.directors" mode="tags" style="width: 100%" :token-separators="[',']"
        placeholder="Select Director" :options="optionDirector" @change="handleChangeDirector"></a-select>
    </a-form-item>
    <a-form-item label="Producer: " v-bind="validateInfos.producers">
      <a-select v-model:value="formState.producers" mode="tags" style="width: 100%" :token-separators="[',']"
        placeholder="Select Producer" :options="optionProducer" @change="handleChangeProducer">
      </a-select>
    </a-form-item>
    <a-form-item label="Release Time:" name="releaseTime" v-bind="validateInfos.releaseTime">
      <a-space direction="vertical" :size="12">
        <a-date-picker v-model:value="formState.releaseTime" />
      </a-space>
    </a-form-item>
    <a-form-item label="Upload Image：">
      <a-upload v-model:file-list="fileList" name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers" @change="handleChangeImage">
        <a-button>
          Click to Uploads
        </a-button>
      </a-upload>
    </a-form-item>
  </a-form>
  <div class="form_errors" v-if="formErrors.length > 0">
    <ul>
      <li v-for="errorItem in formErrors" :key=" errorItem.key">{{ errorItem.message }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { message, type SelectProps, type UploadChangeParam } from 'ant-design-vue';
import { defineComponent, reactive, ref, toRaw, onBeforeMount, inject } from 'vue'
import { Form } from 'ant-design-vue';
import type { MetadataResponse } from '@/type/Metadata.type';
import type { Ref } from "@vue/reactivity/dist/reactivity"

const useForm = Form.useForm;

export default defineComponent({
  props: ['rules', 'formErrors'],
  setup(props) {
    const formState = reactive({
      name: '',
      age: 6,
      image: "",
      description: '',
      casts: [],
      directors: [],
      producers: [],
      releaseTime: null,
    })
    const fileList = ref([]);
    const optionCast = ref<SelectProps['options']>([]);
    const optionDirector = ref<SelectProps['options']>([]);
    const optionProducer = ref<SelectProps['options']>([]);
    const { validateInfos, validate } = useForm(formState, props.rules);
    const metadata = inject<Ref<MetadataResponse>>('metadata')?.value
    /* Function
    =================*/
    optionProducer.value = metadata?.metadata.producers.map(item => {
      return { value: item._id, label: item.name }
    })
    optionCast.value = metadata?.metadata.casts.map(item => {
      return { value: item._id, label: item.name }
    })
    optionDirector.value = metadata?.metadata.directors.map(item => {
      return { value: item._id, label: item.name }
    })

    const handleChangeImage = (info: UploadChangeParam) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const submitForm = () => {
      console.log('submit!', toRaw(formState))
    }

    const handleChangeCast = (value: []) => {
      console.log(`selected ${value}`);
    };

    const handleChangeDirector = (value: []) => {
      console.log(`selected ${value}`);
    };

    const handleChangeProducer = (value: []) => {
      console.log(`selected ${value}`);
    };

    const validateDialog = async () => {
      return validate()
    }

    /* Life circle Hook
    =================*/
    onBeforeMount(() => {

    });

    return {
      optionCast,
      optionDirector,
      optionProducer,
      fileList,
      validateInfos,
      handleChangeCast,
      handleChangeImage,
      handleChangeDirector,
      handleChangeProducer,
      validateDialog,
      headers: {
        authorization: 'authorization-text',
      },
      labelCol: {
        style: {
          width: '150px'
        }
      },
      wrapperCol: {
        span: 14
      },
      formState,
      submitForm
    }
  }
})
</script>
