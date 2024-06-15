import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Entypo } from "@expo/vector-icons";

type HomeCardsButtonsProps = {
  swipeRef: React.RefObject<{ swipeLeft: () => void; swipeRight: () => void }>;
};

const HomeCardsButtons: React.FC<HomeCardsButtonsProps> = ({ swipeRef }) => {
  return (
    <View style={tw.style("flex flex-row justify-evenly")}>
      <TouchableOpacity
        onPress={() => swipeRef.current?.swipeLeft()}
        style={tw.style(
          "items-center justify-center rounded-full w-16 h-16 bg-red-200"
        )}
      >
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => swipeRef.current?.swipeRight()}
        style={tw.style(
          "items-center justify-center rounded-full w-16 h-16 bg-green-200"
        )}
      >
        <Entypo name="heart" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeCardsButtons;
