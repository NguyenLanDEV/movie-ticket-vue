<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Name movie">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Description">
      <a-input v-model:value="formState.description" />
    </a-form-item>
      <a-form-item label="Age：">
        <a-input-number id="inputNumber" v-model:value="age" :min="1" :max="100" />
      </a-form-item>
      <a-form-item label="Cast: ">
        <a-select
        v-model:value="valueCasts"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select Cast"
        :options="optionCast"
        @change="handleChangeCast"
        ></a-select>
      </a-form-item>
      <a-form-item label="Director: ">
        <a-select
        v-model:value="valueDirectors"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select Director"
        :options="optionDirector"
        @change="handleChangeDirector"
        ></a-select>
      </a-form-item>
      <a-form-item label="Producer: ">
        <a-select
        v-model:value="valueProducers"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select Producer"
        :options="optionProducer"
        @change="handleChangeProducer"
        ></a-select>
      </a-form-item>
      <a-form-item label="Release Time: ">
        <a-space direction="vertical" :size="12">
          <a-range-picker v-model:value="releaseTime" />
        </a-space>
      </a-form-item>
      <a-form-item label="Upload Image：">
        <a-upload
        v-model:file-list="fileList"
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChangeImage"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Click to Uploads
        </a-button>
      </a-upload>
      </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { message, type SelectProps, type UploadChangeParam } from 'ant-design-vue';
import { defineComponent, reactive, ref, toRaw, watch } from 'vue'
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
export default defineComponent({
  setup() {
    const formState = reactive({
      name: '',
      description: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      fileList: ''
    })
    const releaseTime = ref<RangeValue>();
    const age = ref<number>(18);
    const fileList = ref([]);
    const valueCasts = ref<string[]>([]);
    const valueDirectors = ref<string[]>([]);
    const valueProducers = ref<string[]>([]);
    const optionCast = ref<SelectProps['options']>([
      {
        value: 'Thinh',
        label: 'Thinh',
      },
    ]);
    const optionDirector = ref<SelectProps['options']>([
      {
        value: 'Thinh',
        label: 'Thinh',
      },
    ]);
    const optionProducer = ref<SelectProps['options']>([
      {
        value: 'Thinh',
        label: 'Thinh',
      },
    ]);


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

    watch(valueCasts, () => {
      console.log('valueCasts', valueCasts.value);
    });
    watch(valueDirectors, () => {
      console.log('valueDirectors', valueDirectors.value);
    });
    watch(valueProducers, () => {
      console.log('valueProducers', valueProducers.value);
    });
    
    return {
      releaseTime,
      valueCasts,
      valueDirectors,
      valueProducers,
      optionCast,
      optionDirector,
      optionProducer,
      fileList,
      age,
      handleChangeCast,
      handleChangeImage,
      handleChangeDirector,
      handleChangeProducer,
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
