import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";

import { Auth, ChatDetails, Chats, Home, Match, Modal } from "../screens";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="ChatDetails" component={ChatDetails} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
            }}
          >
            <Stack.Screen name="Modal" component={Modal} />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
            }}
          >
            <Stack.Screen name="Match" component={Match} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
