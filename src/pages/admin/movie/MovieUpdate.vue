<template>
  <a-form :model="formState"
          :label-col="labelCol" 
          :wrapper-col="wrapperCol"
          :rules="rules">
    <a-form-item label="Name movie" name="name" v-bind="validateInfos.name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Description" name="description"  >
      <a-input v-model:value="formState.description" />
    </a-form-item>
      <a-form-item label="Age：" name="age"  >
        <a-input-number id="inputNumber" v-model:value="formState.age" :min="6" :max="18" /> 
      </a-form-item>
      <a-form-item label="Cast: " >
        <a-select
        v-model:value="formState.casts"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select Cast"
        :options="optionCast"
        
        ></a-select>
      </a-form-item>
      <a-form-item label="Director: " >
        <a-select
        v-model:value="formState.directors"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select Director"
        :options="optionDirector"
       
        ></a-select>
      </a-form-item>
      <a-form-item label="Producer: " >
        <a-select 
          v-model:value="formState.producers" 
          mode="tags" style="width: 100%" 
          :token-separators="[',']"
          placeholder="Select Producer" 
          :options="optionProducer">
        </a-select>
      </a-form-item>
      <a-form-item label="Release Time:" name="releaseTime" >
        <a-space direction="vertical" :size="12">
          <a-date-picker v-model:value="formState.releaseTime" />
        </a-space>
      </a-form-item>
      <a-form-item label="Upload Image：">
        <a-upload
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChangeImage"
      >
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
  import { defineComponent, ref, inject, onBeforeMount } from 'vue'
  import { Form } from 'ant-design-vue';
  import dayjs from "dayjs"
  import { getMovie } from '@/data/Movie.data';
  import { message, type SelectProps, type UploadChangeParam } from 'ant-design-vue';
  import {type Ref} from "@vue/reactivity/dist/reactivity"
  import type { MetadataResponse } from '@/type/Metadata.type'
import type { Movie, MovieUpdateRequest } from '@/type/Movie.type';

  const useForm = Form.useForm;

  export default defineComponent({
    props: ['rules', 'movieId', 'formErrors'],
    setup(props) {
      const currentTime = dayjs()
      const formState = ref<MovieUpdateRequest>({
        name: '',
        age: 6,
        image: "",
        description: '',
        casts: [],
        directors: [],
        producers: [],
        releaseTime: null,
      })
      const optionCast = ref<SelectProps['options']>([ ]);
      const optionDirector = ref<SelectProps['options']>([]);
      const optionProducer = ref<SelectProps['options']>([]);
      const { validateInfos, validate} = useForm(formState, props.rules, {immediate: false});
      const metadata = inject<Ref<MetadataResponse> >('metadata')?.value

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

      const validateDialog =  ()=> {
        return validate()
      }
      
      optionProducer.value = metadata?.metadata.producers.map(item => { 
        return {value: item._id, label: item.name }
      })
      optionCast.value = metadata?.metadata.casts.map(item => { 
        return {value: item._id, label: item.name }
      })
      optionDirector.value = metadata?.metadata.directors.map(item => { 
        return {value: item._id, label: item.name }
      })

      /*Life circle
      ====================*/
      onBeforeMount(()=> {
        getMovie(props.movieId).then(response => {
          formState.value = response.metadata
          formState.value.releaseTime = dayjs(response.metadata.releaseTime)
        })
      })
      
      return {
        currentTime,
        optionCast,
        optionDirector,
        optionProducer,
        handleChangeImage,
        validateDialog,
        validateInfos,
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
        formState
      }
    }
  })
  </script>
  