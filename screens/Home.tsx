import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { HomeCards, HomeCardsButtons, HomeHeader } from "../components";
import tw from "tailwind-react-native-classnames";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const swipeRef = useRef(null);

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

  return (
    <SafeAreaView style={tw.style("flex-1")}>
      <HomeHeader />

      <HomeCards profiles={profiles} swipeRef={swipeRef} />

      <HomeCardsButtons swipeRef={swipeRef} />
    </SafeAreaView>
  );
};

export default Home;
