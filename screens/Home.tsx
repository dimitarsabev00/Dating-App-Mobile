import { NavigationProp, useNavigation } from "@react-navigation/native";
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

type RootStackParamList = {
  Home: undefined;
  Modal: undefined;
};

type Profile = {
  id: string;
  age: string;
  displayName: string;
  job: string;
  photoURL: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
};

const Home = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (snapShot) => {
        if (!snapShot.exists()) {
          navigation.navigate("Modal");
        }
      });
    }
  }, [user, navigation]);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    const fetchCards = async () => {
      if (user) {
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
                  age: doc.data().age,
                  displayName: doc.data().displayName,
                  job: doc.data().job,
                  photoURL: doc.data().photoURL,
                  timestamp: doc.data().timestamp,
                }))
            );
          }
        );
      }
    };

    fetchCards();

    return () => {
      if (unsub) unsub();
    };
  }, [user]);
  console.log(profiles[0].timestamp);
  return (
    <SafeAreaView style={tw.style("flex-1")}>
      <HomeHeader />

      <HomeCards profiles={profiles} swipeRef={swipeRef} />

      <HomeCardsButtons swipeRef={swipeRef} />
    </SafeAreaView>
  );
};

export default Home;
