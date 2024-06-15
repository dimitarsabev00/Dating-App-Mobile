import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const HomeHeader = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={tw.style("flex-row items-center justify-between px-5")}>
      <TouchableOpacity onPress={logout}>
        <Image
          style={tw.style("h-10 w-10 rounded-full")}
          source={{
            uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          textTransform: "uppercase",
          fontSize: 14,
          fontWeight: "600",
          color: "black",
        }}
        onPress={() => navigation.navigate("Modal")}
      >
        Dating App
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
        <Ionicons name="chatbubbles-sharp" size={30} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
