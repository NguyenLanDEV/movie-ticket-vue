import {ApiHelper } from "@/util/ApiHelper"
import type { UserLocalStore } from "@/type/User.type"
export function login(body: {username: string, password: string}) {
    ApiHelper.execute({method: "POST", body: body, hasUser: false})
}

export function setUser(user: object){
    try {
        if(!user || typeof user !== 'object'){
            return false
        }
        localStorage.setItem("user", JSON.stringify(user))
        return true

    } catch (error) {
        return false
    }
}


export function getUser(): UserLocalStore {
    const user = localStorage.getItem("user")
    if(!user) throw("authentication not valid")
    return  JSON.parse(user)  
   
}