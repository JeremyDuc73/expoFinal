import {useState} from "react";
import {Link, useRouter} from "expo-router";
import axios from "axios";
import {
    Button,
    ButtonText,
    FormControl,
    Input,
    InputField,
    InputIcon,
    InputSlot, LinkText,
    Text,
    VStack
} from "@gluestack-ui/themed";
import {EyeIcon, EyeOffIcon} from "lucide-react-native";


export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useRouter()

    async function register() {
        const user = {username, email, password}
        await axios.post("https://messenger.dlfcaroline.online/register", user)
            .then((response) => {
                console.log(response.data)
            })
        navigation.replace('/login')
    }


  return (
      <FormControl
          p="$4"
          borderWidth="$1"
          borderRadius="$lg"
          borderColor="$borderLight300"
          $dark-borderWidth="$1"
          $dark-borderRadius="$lg"
          $dark-borderColor="$borderDark800"
      >
          <VStack space="xl">
              <VStack space="xs">
                  <Text color="$text500" lineHeight="$xs">
                      Username
                  </Text>
                  <Input>
                      <InputField
                          value={username}
                          onChangeText={text => setUsername(text)}
                          type="text" />
                  </Input>
              </VStack>
              <VStack space="xs">
                  <Text color="$text500" lineHeight="$xs">
                      Email
                  </Text>
                  <Input>
                      <InputField
                          value={email}
                          onChangeText={text => setEmail(text)}
                          type="text" />
                  </Input>
              </VStack>
              <VStack space="xs">
                  <Text color="$text500" lineHeight="$xs">
                      Password
                  </Text>
                  <Input>
                      <InputField
                          type={showPassword ? "text" : "password"}
                          secureTextEntry={true}
                          value={password}
                          onChangeText={text => setPassword((text))}
                      />
                      <InputSlot pr="$3" onPress={handleState}>
                          <InputIcon
                              as={showPassword ? EyeIcon : EyeOffIcon}
                              color="$darkBlue500"
                          />
                      </InputSlot>
                  </Input>
              </VStack>
              <Button ml="auto" onPress={register}>
                  <ButtonText>Register</ButtonText>
              </Button>
          </VStack>
          <VStack mt='$5'>
              <Text>Already have an account</Text>
              <Link href="/login">
                  <LinkText>Log in here</LinkText>
              </Link>
          </VStack>
      </FormControl>
  );
}
