import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 90,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        {/* Logo + greeting */}
        <View style={styles.heroSection}>
          <Animated.Image
            source={require("../../assets/images/trace-icon.png")}
            style={[
              styles.logo,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
          <MaskedView
            maskElement={
              <Text style={[styles.title, { backgroundColor: "transparent" }]}>
                {getGreeting()}
              </Text>
            }
          >
            <LinearGradient
              colors={["#0074ff", "#00c6ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>
                {getGreeting()}
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>

        {/* Form */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <TextInput placeholder="Username" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput placeholder="Email" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#888"
            />
          </Pressable>
        </View>

        {/* Checkbox */}
        <Pressable
          onPress={() => setAgree(!agree)}
          style={styles.termsContainer}
        >
          <View
            style={[
              styles.checkbox,
              { backgroundColor: agree ? "#0074ff" : "#fff" },
            ]}
          />
          <Text style={styles.termsText}>
            I agree to the{" "}
            <Text style={{ fontWeight: "bold" }}>terms and conditions</Text>
          </Text>
        </Pressable>

        {/* Sign Up Button */}
        <Pressable style={styles.primaryButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        {/* Social sign-up icons only */}
        <Text style={styles.altLogin}>or sign up with</Text>
        <View style={styles.socialRow}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.socialIcon}
          />
          <Image
            source={require("../../assets/images/apple.png")}
            style={styles.socialIcon}
          />
          <Image
            source={require("../../assets/images/facebook.png")}
            style={styles.socialIcon}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: -8,
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 8,
    marginBottom: 14,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#888",
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#333",
  },
  primaryButton: {
    backgroundColor: "#003f91",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  altLogin: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginHorizontal: 12,
  },
});
