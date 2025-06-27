import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, Text, View } from "react-native";
import SharedGroupPreferences from "react-native-shared-group-preferences";

const APP_GROUP_ID = "group.com.yourcompany.trace";

export default function HomeScreen() {
  const router = useRouter();
  const [isTracing, setIsTracing] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      await Notifications.requestPermissionsAsync();
    };

    const checkForSharedTikTok = async () => {
      try {
        if (Platform.OS === "ios") {
          const result = await SharedGroupPreferences.getItem(
            "sharedURL",
            APP_GROUP_ID
          );

          if (
            result &&
            typeof result === "string" &&
            result.includes("tiktok.com")
          ) {
            setIsTracing(true); // Show the animation!

            const videoId = extractVideoId(result);
            if (videoId) {
              await sendTracingNotification(videoId);

              setTimeout(() => {
                router.push({
                  pathname: "/video/[id]",
                  params: { id: videoId },
                });
              }, 1500);

              await SharedGroupPreferences.setItem(
                "sharedURL",
                "",
                APP_GROUP_ID
              );
            }
          }
        }
      } catch (err) {
        console.error("❌ Error reading shared TikTok URL:", err);
      }
    };

    requestPermission();
    checkForSharedTikTok();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isTracing ? (
        <>
          <Image
            source={require("../../assets/images/trace-logo.png")}
            style={{ width: 100, height: 100, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18 }}>Tracing video...</Text>
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginTop: 20 }}
          />
        </>
      ) : (
        <Text style={{ fontSize: 20 }}>Welcome to Trace 👀</Text>
      )}
    </View>
  );
}

function extractVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match?.[1] ?? null;
}

async function sendTracingNotification(videoId: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Video Traced!",
      body: "Tap to open the video in Trace 📍",
      data: { id: videoId },
    },
    trigger: null,
  });
}
