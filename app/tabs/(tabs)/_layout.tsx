import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import {MessageCircleIcon} from "lucide-react-native";
import {Icon} from "@gluestack-ui/themed";
import {Globals} from "@/app/common/globals";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="private-conversations"
        options={{
            title: `Private Conversations`,
            tabBarIcon: ({ color }) => <FontAwesome size={25} name={'comments'} />,
            tabBarShowLabel: false
        }}
      />

    <Tabs.Screen
        name="profile"
        options={{
            title: `Hello ${Globals.actualUser.username}`,
            tabBarIcon: ({ color }) => <FontAwesome size={25} name={'comments'} />,
            tabBarShowLabel: false
        }}
    />




    </Tabs>
  );
}
