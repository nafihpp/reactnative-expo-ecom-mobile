"use client"

import { View } from "react-native"
import { Text, Button } from "@rneui/themed"

interface ErrorScreenProps {
  error: string
  onRetry?: () => void
}

export default function ErrorScreen({ error, onRetry }: ErrorScreenProps): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "red",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {error}
      </Text>
      {onRetry && <Button title="Retry" onPress={onRetry} buttonStyle={{ paddingHorizontal: 30 }} />}
    </View>
  )
}
