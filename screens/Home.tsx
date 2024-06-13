import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Button, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
const Home = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  return (
    <SafeAreaView>
      {/* Header  */}
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
        >
          Dating App
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      {/* End Header  */}
    </SafeAreaView>
  );
};

export default Home;
