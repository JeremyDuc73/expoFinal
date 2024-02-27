import {
    Text,
    Center,
    Heading,
    Divider,
    VStack,
    Input,
    InputField,
    InputSlot,
    InputIcon,
    FormControl,
    FormControlErrorText,
    Box,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText, FormControlError, FormControlErrorIcon, ButtonText, Button, Icon, LinkText
} from "@gluestack-ui/themed";
import {useMemo, useState} from "react";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {TextInput} from "@/components/TextInput";
import {Link, router} from "expo-router";
import * as SecureStore from 'expo-secure-store';


type FormValues = {
    username: string;
    password: string;
};

async function save(key: any, value: any) {
    await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key: any) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        alert('No values stored under that key.');
    }
}

export default function Login() {
    const [key, onChangeKey] = useState('');
    const [value, onChangeValue] = useState('');
    const {...methods} = useForm({mode: 'onChange'});

    const onSubmit: SubmitHandler<FormValues> = (formDatas) => {
        let test: any = null
        console.log(formDatas)
        const url = "https://messenger.dlfcaroline.online/api/login_check"
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "username": formDatas.username,
                "password": formDatas.password,
            })
        })
            .then(response => response.json())
            .then(data => save("token", data.token))
            .catch(error => console.error(error))
        console.log(getValueFor("token"))
        router.replace('/tabs/(tabs)/private-conversations')
    };

    const [formError, setError] = useState<Boolean>(false)
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({errors})
    }


    return (

<VStack p='$4' mt='$10'>
            { formError ? <VStack><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></VStack> :
                <>
                    <FormProvider {...methods}>
                        <VStack space='xl'>
                            {/*                            <Heading color='$text900' lineHeight='$md'>
                                Register
                            </Heading>*/}
                            <FormControl isRequired={true}>
                                <FormControlLabel>
                                    <FormControlLabelText>Username</FormControlLabelText>
                                </FormControlLabel>
                                <TextInput
                                    label=""
                                    name="username"
                                    rules={{ required: 'Username is required!' }}
                                    setFormError={setError}
                                />
                            </FormControl>
                            <Box>
                                <FormControl
                                    isRequired={true}
                                >
                                    <FormControlLabel>
                                        <FormControlLabelText>Password</FormControlLabelText>
                                    </FormControlLabel>
                                    <TextInput
                                        label=""
                                        name="password"
                                        rules={{required: "Password is required !"}}
                                        setFormError = {setError}
                                    />
                                </FormControl>
                            </Box>
                            <VStack>
                                <Button onPress={methods.handleSubmit(onSubmit)} size="lg" action="positive">
                                    <ButtonText>Log In</ButtonText>
                                </Button>
                            </VStack>
                        </VStack>
                    </FormProvider>
                    <VStack mt='$5'>
                        <Text>No account yet?</Text>
                        <Link href="/register">
                            <LinkText>Register here</LinkText>
                        </Link>
                    </VStack>
                </>
            }
        </VStack>
    );
}
