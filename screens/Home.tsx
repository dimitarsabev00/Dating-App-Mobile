import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../contexts/AuthContext";
const Home = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <Text style={tw.style("text-blue-400")}>Home Screen</Text>
      <Button
        title="Open All Chats"
        onPress={() => navigation.navigate("Chats")}
      />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default Home;
