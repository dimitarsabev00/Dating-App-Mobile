import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

type HeaderChatDetailsProps = {
  title: string;
};

const HeaderChatDetails: React.FC<HeaderChatDetailsProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={tw.style("p-2 flex-row items-center justify-between")}>
      <View style={tw.style("flex flex-row items-center")}>
        <TouchableOpacity
          style={tw.style("p-2")}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#000000" />
        </TouchableOpacity>
        <Text style={tw.style("text-2xl font-bold pl-2")}>{title}</Text>
      </View>
      <TouchableOpacity style={tw.style("rounded-full mr-4 p-3 bg-gray-200")}>
        <Foundation name="telephone" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderChatDetails;
