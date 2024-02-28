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
import {PrivConv} from "@/app/interfaces/PrivConv";

export default function PrivateConversations(){

    let token = SecureStore.getItem("token")
    const actualUser = Globals.actualUser

    const [privateConvs, setPrivateConvs] = useState<PrivConv[]>([])
    const getPrivateConversations = () => {
        return axiosPrepared.get(Globals.baseUrl+"private/conversations/"+actualUser.id)
            .then((response) => {
                setPrivateConvs(response.data)
            })
    }


    //
    // FAIRE LES CONV PRIVEES
    //


    return(
        <VStack>
            <FlatList
                data={privateConvs}
                renderItem={({item}:{item:PrivConv}) => <VStack><Text>{item.id}</Text></VStack>}
            />
        </VStack>
    )
}

const styles = StyleSheet.create({

    })