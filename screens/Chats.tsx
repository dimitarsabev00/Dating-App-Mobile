import React from "react";
import { SafeAreaView } from "react-native";
import { ChatsList, HeaderChats } from "../components";
import tw from "tailwind-react-native-classnames";

const Chats = () => {
  return (
    <SafeAreaView style={tw.style("pt-5")}>
      <HeaderChats />
      <ChatsList />
    </SafeAreaView>
  );
};

export default Chats;
