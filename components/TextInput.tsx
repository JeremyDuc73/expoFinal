import React, {useState} from 'react';

import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text, StyleSheet } from 'react-native';

import { useController, useFormContext, ControllerProps, UseControllerProps } from 'react-hook-form';

import Constants from 'expo-constants';
import {
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText, FormControlHelper, FormControlHelperText,
    Input,
    InputField, InputIcon, InputSlot,
    VStack
} from "@gluestack-ui/themed";
import {AlertCircleIcon, EyeIcon, EyeOffIcon} from "lucide-react-native";



interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label: string
    name: string
    defaultValue?: string
    setFormError: Function
}



const ControlledInput = (props: TextInputProps) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

    const formContext = useFormContext();
    const { formState } = formContext;

    const {
        name,
        label,
        rules,
        defaultValue,
        ...inputProps
    } = props;

    const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    if (name === "password")
    {
        return (

            <VStack>
                <Text>{label && (<Text style={styles.label}>{label}</Text>)}</Text>
                <Input>
                    <InputField
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        {...inputProps}
                    />
                    <InputSlot pr="$3" onPress={handleState}>
                        {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                        <InputIcon
                            as={showPassword ? EyeIcon : EyeOffIcon}
                            color="$darkBlue500"
                        />
                    </InputSlot>
                </Input>
                <FormControlHelper>
                    <FormControlHelperText>
                        {hasError && (<Text style={styles.error}>{formState.errors[name].message}</Text>)}
                    </FormControlHelperText>
                </FormControlHelper>
            </VStack>

        );
    }
    else
    {
        return (

            <VStack>
                <Text>{label && (<Text style={styles.label}>{label}</Text>)}</Text>
                <Input>
                    <InputField
                        autoCapitalize="none"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        {...inputProps}
                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText>
                        {hasError && (<Text style={styles.error}>{formState.errors[name].message}</Text>)}
                    </FormControlHelperText>
                </FormControlHelper>
            </VStack>

        );
    }
}

export const TextInput = (props: TextInputProps) => {

    const {
        name,
        rules,
        label,
        defaultValue,
        setFormError,
        ...inputProps
    } = props;

    const formContext = useFormContext();

// Placeholder until input name is initialized
    if (!formContext || !name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
        console.error(msg)
        setFormError(true)
        return null
    }

    return <ControlledInput {...props} />;

};


const styles = StyleSheet.create({
    label: {
        margin: 10,
        marginLeft: 0,
    },
    input: {
        borderColor: '#919191',
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
    errorContainer: {
        flex: -1,
        height: 25
    },
    error: {
        color: 'red'
    }
});