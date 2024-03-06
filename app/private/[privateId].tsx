import {
    Box,
    Button,
    ButtonText,
    Card, CloseIcon, Divider,
    Heading,
    HStack, Icon,
    Input,
    InputField,
    Menu,
    MenuItem,
    MenuItemLabel, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
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
    const [editContent, setEditContent] = useState("")
    const [privateMessages, setPrivateMessages] = useState<Message[]>([])

    const [showModal, setShowModal] = useState(false)
    const ref = React.useRef(null)



    const getPrivateMessages =  async () => {
        return await axiosPrepared.get(Globals.baseUrl+"private/conversation/"+privateId)
            .then((response) => {
                console.log('messages fetched')
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

    async function deleteMessage(messageId: number) {
        await axiosPrepared.delete(Globals.baseUrl+"private/conversation/"+privateId+"/delete/"+messageId)
            .then((response) => {
                console.log(response.data)
            })
        getPrivateMessages()
    }

    async function editMessage(messageId: number) {
        await axiosPrepared.put(Globals.baseUrl+"private/conversation/"+privateId+"/edit/"+messageId, {
            content: editContent
        })
            .then((response) => {
                console.log(response.data)
            })
        setEditContent("")
        setShowModal(false)
        getPrivateMessages()
    }

    function showModalWithContent(messageContent: string) {
        console.log(messageContent)
        setShowModal(true)
        setEditContent(messageContent)
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
                            <MenuItem key="Modify" textValue="Modify" p="$0" m="$0">
                                <Button onPress={() => showModalWithContent(item.content)} style={styles.message}>
                                    <FontAwesome size={15} name={'pencil'} style={styles.iconMenu}/>
                                    <ButtonText color="black" size="sm">Modify</ButtonText>
                                </Button>
                                <Modal
                                    isOpen={showModal}
                                    onClose={() => {
                                        setShowModal(false)
                                    }}
                                    finalFocusRef={ref}
                                >
                                    <ModalBackdrop />
                                    <ModalContent>
                                        <ModalHeader>
                                            <Heading size="lg">Edit message</Heading>
                                            <ModalCloseButton>
                                                <Icon as={CloseIcon} />
                                            </ModalCloseButton>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Input
                                                variant="rounded"
                                            >
                                                <InputField
                                                    placeholder="Enter Text here"
                                                    value={editContent}
                                                    onChangeText={text => setEditContent(text)}
                                                    type="text"/>
                                            </Input>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onPress={() => editMessage(item.id)} style={styles.buttonSend}>
                                                <FontAwesome size={20} name={'paper-plane'} color="white"/>
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </MenuItem>

                            <MenuItem key="Delete" textValue="Delete" p="$0" m="$0">
                                <Button onPress={() => deleteMessage(item.id)} style={styles.message}>
                                    <FontAwesome size={15} name={'trash'} style={styles.iconMenu}/>
                                    <ButtonText color="black" size="sm">Delete</ButtonText>
                                </Button>
                            </MenuItem>
                        </Menu>
                        <Divider my="$1"/>
                    </>
                )}
            />
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
