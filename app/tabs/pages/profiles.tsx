import {
    Divider,
    Text, VStack,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import {useState} from "react";
import {Profile} from "@/app/interfaces/Profile";
import {FlatList, StyleSheet} from "react-native";

export default function PrivateConversations(){
    let token = SecureStore.getItem("token")
    const actualUser = Globals.actualUser

    const [profiles, setProfiles] = useState<Profile[]>([])



    const getProfilesFromAPI = () => {
        return axiosPrepared.get(Globals.baseUrl+"profiles")
            .then((response) => {
                setProfiles(response.data)
            })
    }
    getProfilesFromAPI()

    return(
        <VStack>
            <FlatList
                data={profiles}
                renderItem={ ({item}:{item:Profile})=> <VStack><Text>{item.username}</Text><Divider my="$4"/></VStack> }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({

})