import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import AuthContext from "./contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContext>
        <StackNavigator />
      </AuthContext>
    </NavigationContainer>
  );
}
