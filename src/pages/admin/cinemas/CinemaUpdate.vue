<template>
    <a-form :model="formState" v-bind="layout">
        <a-form-item name="name" label="Name" v-bind="validateInfos.name">
            <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item name="email" label="Email" v-bind="validateInfos.email">
            <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item name="phone" label="phone" v-bind="validateInfos.phone">
            <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item name="address" label="address" v-bind="validateInfos.address">
            <a-input v-model:value="formState.address" />
        </a-form-item>

        <a-form-item name="cityId" label="city">
            <a-select v-model:value="formState.city" style="width: 200px" :options="cityOptions"
                :filterOption="true"></a-select>
        </a-form-item>

        <a-form-item name="clusterId" label="Cinemas cluster" v-bind="validateInfos.clusterId">
            <a-select v-model:value="formState.clusterId" style="width: 120px" :options="clusterCinemaOptions"
                :filterOption="true"></a-select>
        </a-form-item>
        <div class="form_errors" v-if="formErrors.length > 0">
            <ul>
                <li v-for="errorItem in formErrors" :key="errorItem.key">{{errorItem.message }}</li>
            </ul>
        </div>
    </a-form>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, ref, inject } from 'vue'
import { Form } from 'ant-design-vue';
import {getById} from "@/data/Cinema.data"
import {joinLeftObject} from '@/util/common'
import type { SelectProps } from 'ant-design-vue';
import type { MetadataResponse } from '@/type/Metadata.type';
import type { Ref } from "@vue/reactivity/dist/reactivity"

const useForm = Form.useForm;
export default defineComponent({
    name: "CinemaCreate",
    props: ['rules', 'formErrors', 'cinemaId'],
    setup(props) {
        const metadata = inject<Ref<MetadataResponse>>('metadata')?.value
        const cityOptions = ref<SelectProps['options']>([])

        const clusterCinemaOptions = ref<SelectProps['options']>([]);

        cityOptions.value = metadata?.metadata.cities.map(item => {
            return { value: item._id, label: item.name }
        })

        clusterCinemaOptions.value = metadata?.metadata.clusterCinemas.map((_) => {
            return {
                value: _._id,
                label: _.name
            }
        })

        getById(props.cinemaId)
            .then(rs => {
                formState.value = joinLeftObject(formState.value, rs.metadata)
            })
            .catch(rs=> {
                message.error("Request error!")
            })
        const handleChange: SelectProps['onChange'] = value => {
            console.log(value);
        };
        const formState = ref({
            _id: "",
            name: "",
            email: "",
            phone: '',
            address: '',
            city: '01',
            clusterId: ''
        })
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const { validateInfos, validate } = useForm(formState, props.rules);

        return {
            formState,
            layout,
            clusterCinemaOptions,
            cityOptions,
            validateInfos,
            validate,
            handleChange
        }
    }
})
</script>

<style lang="scss" scoped></style>