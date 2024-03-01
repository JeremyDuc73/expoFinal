import {
    Box,
    Button,
    ButtonText,
    Card, Divider,
    Heading,
    HStack, Icon,
    Input,
    InputField,
    Menu,
    MenuItem,
    MenuItemLabel,
    Text
} from "@gluestack-ui/themed";
import {Link, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet} from "react-native";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import {PrivConv} from "@/app/interfaces/PrivConv";
import axiosPrepared from "@/app/auth/interceptor";
import {Message} from "@/app/interfaces/Message";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function PrivateId() {
    const {privateId} = useLocalSearchParams()

    const actualUser = Globals.actualUser

    const [content, setContent] = useState("")
    const [privateMessages, setPrivateMessages] = useState<Message[]>([])
    const getPrivateMessages =  async () => {
        return await axiosPrepared.get(Globals.baseUrl+"private/conversation/"+privateId)
            .then((response) => {
                console.log('blabla')
                setPrivateMessages(response.data)
            })
    }

    async function sendMessage() {
        await axiosPrepared.post(Globals.baseUrl+"private/conversation/"+privateId+"/message/new", {
            content: content,
            associatedImages: []
        })
            .then((response)=> {
                console.log(response.data)
            })
        setContent("")
        getPrivateMessages()
    }

    useEffect(() => {
        getPrivateMessages()
    }, []);


    return (
        <>
           <Box py="$10">
            <FlatList
                data={privateMessages}
                renderItem={({item}: { item: Message; }) => (

                    <>
                        <Menu
                            placement="top"
                            trigger={({...triggerProps}) => {
                                return (
                                    <Button
                                        {...triggerProps}
                                        action="secondary"
                                        style={styles.message}
                                    >
                                        <ButtonText>{item.author.username == actualUser.username ?
                                            <Text style={styles.textBlue}>{item.content}</Text> :
                                            <Text style={styles.textBlack}>{item.content}</Text>}</ButtonText>
                                    </Button>
                                );
                            }}
                        >
                            <MenuItem key="Modify" textValue="Modify">
                                <Button onPress={() => {console.log('coucou')}} style={styles.message}>
                                    <FontAwesome size={15} name={'pencil'} style={styles.iconMenu}/>
                                    <ButtonText color="black" size="sm">Modify</ButtonText>
                                </Button>
                            </MenuItem>
                            <MenuItem key="Delete" textValue="Delete">
                                <FontAwesome size={15} name={'trash'} style={styles.iconMenu}/>
                                <MenuItemLabel size="sm">Delete</MenuItemLabel>
                            </MenuItem>
                        </Menu>
                        <Divider my="$1"/>
                    </>
                )}/>
            <HStack style={styles.test}>
                <Input
                    variant="rounded"
                    style={styles.oui}
                >
                    <InputField
                        placeholder="Enter Text here"
                        value={content}
                        onChangeText={text => setContent(text)}
                        type="text"/>
                </Input>
                <Button onPress={sendMessage} style={styles.buttonSend}>
                    <FontAwesome size={20} name={'paper-plane'} color="white"/>
                </Button>
            </HStack>
        </Box>

        </>
    )
}

const styles = StyleSheet.create({
    textBlack: {
        color:"black"
    },
    textBlue: {
        color: "blue"
    },
    test: {
        justifyContent: "space-between",
    },
    oui: {
        width: "85%"
    },
    buttonSend: {
        width: "15%"
    },
    iconMenu: {
        marginEnd: 10
    },
    message: {
        backgroundColor: "none"
    }
})