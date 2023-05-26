import { ref } from 'vue'
import { defineStore } from 'pinia'

class Modal {
    public title: string
    public visible:boolean = false

    constructor(title: string){
        this.title = title
    }

    public showModal (){
        this.visible = true
    }

    public closeModal(){
        this.visible = false
    }
}
export const useModalStore = defineStore('modal', () => {
    const listModal = ref<Modal[]>([])
    const createModal = (title: string) => {
        if(!title) {
            throw new Error("Required title");
            
        }
        const modal = new Modal(title) 
        listModal.value.push(modal)
        return ref(modal)
    }

    const getModal = (title: string) => {
        const index = listModal.value.findIndex(modal => modal.title = title)
        return listModal.value[index]
    }
    return { 
                listModal,
                createModal,
                getModal,
                
            }
})
