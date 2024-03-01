import Gradient from "../assets/Icons/Gradient";
import DocumentData from "../assets/Icons/DocumentData";
import LightBulbPerson from "../assets/Icons/LightbulbPerson";
import Rocket from "../assets/Icons/Rocket";
import Logo from "../assets/Icons/Logo";

import {
  Box,
  Button,
  ButtonText,
  HStack,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";

import { Link } from "expo-router";


export default function Home() {
  return (
    <Box flex={1} backgroundColor="$black">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <Box
          position="absolute"
          $base-h={500}
          $base-w={500}
          $lg-h={500}
          $lg-w={500}
        >
          <Gradient />
        </Box>

        <Box
          height="60%"
          $base-my="$16"
          $base-mx="$5"
          $base-height="80%"
          $lg-my="$24"
          $lg-mx="$5"
          justifyContent="space-between"
        >
          <HStack justifyContent="space-between" marginHorizontal="$10">

            <Link href="/(auth)/login">
              <Box
                bg="#64748B33"
                rounded="$full"
                alignItems="center"
                py="$2"
                px="$6"
                marginTop="$5"
                $base-flexDirection="column"
                $sm-flexDirection="ro"
                $md-flexDirection="flex-end"
              >
                <Text color="$white" fontWeight="$normal">
                  Welcome
                </Text>
              </Box>
            </Link>
          </HStack>

          <Box justifyContent="center" alignItems="center">
            <Text>Flap flap</Text>
          </Box>

        </Box>
      </ScrollView>
    </Box>
  );
}
