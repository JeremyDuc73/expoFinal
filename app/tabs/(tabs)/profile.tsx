import {Button, ButtonText, Text, VStack, LinkText} from "@gluestack-ui/themed";
import {Link} from "expo-router";

export default function profile(){

    return(
        <VStack>
            <Text>lalalalala</Text>
            <VStack mt='$5'>
                <Text>No account yet?</Text>
                <Link href="/profiles">
                    <LinkText>all profilesre</LinkText>
                </Link>
            </VStack>


        </VStack>
    )
}