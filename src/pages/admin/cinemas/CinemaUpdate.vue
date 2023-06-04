<template>
    <a-form :model="formState" v-bind="layout">
        <a-form-item name="name" label="Name">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        
        <a-form-item name="email" label="Email">
            <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item name="phone" label="phone">
            <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item name="address" label="address">
            <a-input v-model:value="formState.address" />
        </a-form-item>

        <a-form-item name="cityId" label="city" >
            <a-select v-model:value="formState.city" style="width: 200px" 
                        :options="cityOptions"
                        :filterOption="true"
                        ></a-select>
        </a-form-item>
      
        <a-form-item name="clusterId" label="Cinemas cluster">
            <a-select v-model:value="formState.clusterId"  style="width: 120px" 
                        :options="clusterCinemaOptions"
                        :filterOption="true"
                        ></a-select>
        </a-form-item>

        <a-form-item name="introduction" label="Introduction">
            <a-textarea v-model:value="formState.introduction" />
        </a-form-item>
        
    </a-form>
</template>

<script lang="ts">
import { reactive, defineComponent, ref, inject } from 'vue'
import type { SelectProps } from 'ant-design-vue';
import type { MetadataResponse } from '@/type/Metadata.type';
import type {Ref} from "@vue/reactivity/dist/reactivity"
export default defineComponent({
    name: "CinemaCreate",
    setup() {
        const metadata = inject<Ref<MetadataResponse>>('metadata')?.value
        const cityOptions = ref<SelectProps['options']>([])

        const clusterCinemaOptions = ref<SelectProps['options']>([]);
        
        cityOptions.value = metadata?.metadata.cities.map(item => {
            return {value: item._id, label: item.name}
        })
        
        clusterCinemaOptions.value = metadata?.metadata.clusterCinemas.map(( _, index)=> {
            return {
                value: _._id,
                label: _.name
            }
        })
        const handleChange: SelectProps['onChange'] = value => {
            console.log(value); 
        };
        const formState = ref({
            name: "",
            email: "",
            phone: '',
            address: '',
            introduction: '',
            city: '01',
            clusterId: ''
        })
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        return {
            formState,
            layout,
            clusterCinemaOptions,
            cityOptions,

            handleChange
        }
    }
})
</script>

<style lang="scss" scoped></style>