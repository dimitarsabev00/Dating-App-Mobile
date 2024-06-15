import React from "react";
import { SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { ChatsList, HeaderChats } from "../components";

const Chats = () => {
  return (
    <SafeAreaView style={tw.style("pt-5")}>
      <HeaderChats />
      <ChatsList />
    </SafeAreaView>
  );
};

export default Chats;
