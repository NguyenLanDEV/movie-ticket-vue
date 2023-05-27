import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ModalType } from '@/type/Common.type'
class Modal {
    public title: string
    public type: ModalType
    public visible:boolean = false

    constructor(title: string, type: ModalType){
        this.title = title
        this.type = type
    }

    public showModal (){
        this.visible = true
    }

    public closeModal(){
        this.visible = false
    }
}
export const useModalStore = defineStore('modal', () => {
    const registerModal = (title: string, type: ModalType) => {
        if(!title) {
            throw new Error("Required title");
        }
        const modal = new Modal(title, type) 
        return ref(modal)
    }
    return { registerModal}
})
