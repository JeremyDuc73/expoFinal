import {
    Avatar, AvatarImage,
    Box,
    Button, ButtonText, Card,
    Divider, Heading, HStack,
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
import {Link, router} from "expo-router";

export default function PrivateConversations(){
    if (!Globals.isLoggedIn()){
        router.push("/login")
    }


    let token = Globals.token
    const actualUser = Globals.actualUser

    const [privateConvs, setPrivateConvs] = useState<PrivConv[]>([])
     const getPrivateConversations =  async () => {
        return await axiosPrepared.get(Globals.baseUrl+"private/conversations/"+actualUser.id)
            .then((response) => {
                setPrivateConvs(response.data)
            })
    }


    getPrivateConversations()

    return(
        <Box py="$10">
            <FlatList
                data={privateConvs}
                renderItem={({item}:{item:PrivConv}) => (
                    <Card  size="md" variant="elevated" m="$2">
                        <HStack style={styles.cardConvs}>
                            {item.participantA.username == actualUser.username ? <Heading>{item.participantB.username}</Heading> : <Heading>{item.participantA.username}</Heading>}
                            <Link
                                href={{
                                    pathname: "/private/[privateId]",
                                    params: { privateId: item.id }
                                }}>
                                VIEW
                            </Link>
                        </HStack>
                    </Card>
                )}
            />
        </Box>
    )
}

const styles = StyleSheet.create({
    cardConvs: {
        justifyContent:"space-between"
    }
})