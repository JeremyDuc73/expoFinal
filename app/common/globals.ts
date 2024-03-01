import {Profile} from "@/app/interfaces/Profile"
import * as SecureStore from "expo-secure-store"

export class Globals {
    public static baseUrl = "https://messenger.dlfcaroline.online/api/"
    public static token = "" //SecureStore.getItem("token")
    public static actualUser: Profile

    public static isLoggedIn(){
        return Globals.token != ""
    }
}



