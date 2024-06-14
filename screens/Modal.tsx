import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { db, timestamp } from "../configs/firebase";

const Modal = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");

  const incompleteForm = !image || !age || !job;

  const updateUserProfile = () => {
      setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job,
        age,
        timestamp,
      })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((err) => {
          Alert.alert("Error", err.message);
        });
  };

  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Text style={tw.style("text-xl text-gray-500 p-2 font-bold mt-20")}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Step 1: The Profile Pic
      </Text>

      <TextInput
        placeholder="Enter a profile pic url"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="url"
        value={image}
        onChangeText={setImage}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Step 2: The Job
      </Text>

      <TextInput
        placeholder="Enter your occupation"
        style={tw.style("text-center text-xl pb-2")}
        onChangeText={setJob}
        value={job}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Step 3: The Age
      </Text>

      <TextInput
        placeholder="Enter your age"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={tw.style(
          "w-64 p-3 rounded-xl absolute bottom-10 bg-red-400",
          incompleteForm && "bg-gray-400"
        )}
        onPress={updateUserProfile}
      >
        <Text style={tw.style("text-center text-white text-xl")}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Modal;
