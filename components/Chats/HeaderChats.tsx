import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const HeaderChats = () => {
  const navigation = useNavigation();

  return (
    <View style={tw.style("p-2 flex-row items-center justify-between")}>
      <View style={tw.style("flex flex-row items-center")}>
        <TouchableOpacity
          style={tw.style("p-2")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#00000" />
        </TouchableOpacity>
        <Text style={tw.style("text-2xl font-bold pl-2")}>Chats</Text>
      </View>
    </View>
  );
};

export default HeaderChats;
