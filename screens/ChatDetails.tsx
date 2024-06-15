import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";

const ChatDetails = () => {
  return (
    <SafeAreaView>
      <Text style={tw.style("text-center font-bold mt-20")}>Chat Details</Text>
    </SafeAreaView>
  );
};

export default ChatDetails;
