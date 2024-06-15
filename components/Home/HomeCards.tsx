import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Swiper from "react-native-deck-swiper";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { db, timestamp } from "../../configs/firebase";
import { generateId } from "../../utils/helpers";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { Profile } from "../../screens/Home";

export type RootStackParamList = {
  Home: undefined;
  Match: {
    loggedInProfile: DocumentData | undefined;
    userSwiped: Profile;
  };
};

type HomeCardsProps = {
  profiles: Profile[];
  swipeRef: React.RefObject<{ swipeLeft: () => void; swipeRight: () => void }>;
};

const HomeCards: React.FC<HomeCardsProps> = ({ profiles, swipeRef }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const swipeLeft = (cardIndex: number) => {
    if (!profiles[cardIndex]) {
      return;
    }

    if (user) {
      const userSwiped = profiles[cardIndex];

      setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    }
  };

  const swipeRight = async (cardIndex: number) => {
    if (user) {
      try {
        if (!profiles[cardIndex]) {
          return;
        }

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (
          await getDoc(doc(db, "users", user.uid))
        ).data();

        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
          (docSnap) => {
            if (docSnap.exists()) {
              setDoc(
                doc(db, "users", user.uid, "swipes", userSwiped.id),
                userSwiped
              );

              setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                users: {
                  [user.uid]: loggedInProfile,
                  [userSwiped.id]: userSwiped,
                },
                usersMatched: [user.uid, userSwiped.id],
                timestamp,
              });

              navigation.navigate("Match", {
                loggedInProfile,
                userSwiped,
              });
            } else {
              setDoc(
                doc(db, "users", user.uid, "swipes", userSwiped.id),
                userSwiped
              );
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={tw.style("flex-1")}>
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
                style={tw.style(
                  "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                )}
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
  );
};

export default HomeCards;
