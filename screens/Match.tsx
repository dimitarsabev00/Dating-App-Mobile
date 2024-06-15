import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

type RootStackParamList = {
  Chats: undefined;
};

type MatchScreenParams = {
  loggedInProfile: {
    photoURL: string;
  };
  userSwiped: {
    displayName: string;
    photoURL: string;
  };
};

type MatchScreenRouteProp = RouteProp<{ Match: MatchScreenParams }, "Match">;

const Match = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<MatchScreenRouteProp>();

  const { loggedInProfile, userSwiped } = route.params;

  return (
    <View style={tw.style("h-full bg-green-500 pt-20", { opacity: 0.89 })}>
      <View style={tw.style("justify-center px-10 pt-20")}>
        <Image
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
          style={tw.style("h-20 w-full")}
        />
        <Text style={tw.style("text-white text-center mt-5")}>
          You and {userSwiped.displayName} have liked each other
        </Text>

        <View style={tw.style("flex-row justify-evenly mt-5")}>
          <Image
            style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: loggedInProfile.photoURL,
            }}
          />
          <Image
            style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: userSwiped.photoURL,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={tw.style("bg-white m-5 px-10 py-8 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chats");
        }}
      >
        <Text style={tw.style("text-center")}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Match;
