import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../configs/firebase";

const Auth = () => {
  const [type, setType] = useState("signIn");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoading } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const signIn = async () => {
    if (!email || !password) {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Ohhh!!", "Invalid Email Or Password");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
    } catch (error: any) {
      const errorMessage = error.message;
      Alert.alert("Error Message:", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={tw.style("flex-1")}>
      {type === "signIn" ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign In</Text>
          <Text style={tw.style("text-black font-semibold")}>
            Access to your account
          </Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-black")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-black")}>
              Password
            </Text>
            <TextInput
              keyboardType="default"
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signIn}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType("signUp")}>
              <Text style={tw.style("text-center text-black pt-3")}>
                Doesn't have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign Up</Text>
          <Text style={tw.style("text-black")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-black")}>Name</Text>
            <TextInput
              keyboardType="default"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-black")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
              secureTextEntry={false}
            />
            <Text style={tw.style("font-semibold pb-2 text-black")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signUp}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType("signIn")}>
              <Text style={tw.style("text-center text-black pt-3")}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Auth;
