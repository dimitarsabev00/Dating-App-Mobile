import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../contexts/AuthContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../configs/firebase";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  const swipeRef = useRef<any>(null);

  useLayoutEffect(() => {
    onSnapshot(doc(db, "users", user.uid), (snapShot) => {
      if (!snapShot.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);
  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["temp"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapShot) => {
          setProfiles(
            snapShot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();

    return unsub;
  }, []);

  const swipeLeft = (cardIndex: number) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = (cardIndex: number) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView style={tw.style("flex-1 mt-6")}>
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
          onPress={() => navigation.navigate("Modal")}
        >
          Dating App
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      {/* End Header  */}
      {/* Cards  */}
      <View style={tw.style("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View
                key={card.id}
                style={tw.style("bg-white h-3/4 rounded-xl relative")}
              >
                <Image
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />

                <View
                  style={[
                    tw.style(
                      "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw.style("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw.style("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw.style(
                  "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                )}
              >
                <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={tw.style("h-20 w-20")}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      {/* End Cards  */}

      <View style={tw.style("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw.style(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
