"use client"

import { View, ActivityIndicator } from "react-native"
import { Text } from "@rneui/themed"
import { theme } from "../../theme"

export default function LoadingScreen(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text
        style={{
          marginTop: 16,
          fontSize: 16,
          color: "#666",
        }}
      >
        Loading...
      </Text>
    </View>
  )
}
