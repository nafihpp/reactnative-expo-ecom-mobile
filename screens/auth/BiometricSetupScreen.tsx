"use client"

import { useState } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Text, Button, Card } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import SecureAuthManager from "../../utils/secureAuth"

interface BiometricSetupScreenProps {
  navigation: any
}

export default function BiometricSetupScreen({ navigation }: BiometricSetupScreenProps) {
  const [loading, setLoading] = useState(false)
  const authManager = SecureAuthManager.getInstance()

  const handleEnableBiometric = async () => {
    try {
      setLoading(true)

      const isAvailable = await authManager.isBiometricAvailable()
      if (!isAvailable) {
        Alert.alert(
          "Biometric Not Available",
          "Biometric authentication is not available on this device or not set up.",
        )
        return
      }

      const authenticated = await authManager.authenticateWithBiometrics()
      if (authenticated) {
        await authManager.setBiometricEnabled(true)
        Alert.alert("Success", "Biometric authentication has been enabled for your account.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ])
      } else {
        Alert.alert("Authentication Failed", "Please try again.")
      }
    } catch (error) {
      console.error("Biometric setup error:", error)
      Alert.alert("Error", "Failed to enable biometric authentication.")
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="finger-print" type="ionicon" size={80} color="#E91E63" />
        </View>

        <Card containerStyle={styles.card}>
          <Text style={styles.title}>Secure Your Shopping</Text>
          <Text style={styles.description}>
            Enable biometric authentication to add an extra layer of security to your ShopEase account. You'll be able
            to unlock the app using your fingerprint or face recognition.
          </Text>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Icon name="shield-checkmark" type="ionicon" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>Enhanced Security</Text>
            </View>
            <View style={styles.feature}>
              <Icon name="flash" type="ionicon" size={24} color="#FF9800" />
              <Text style={styles.featureText}>Quick Access</Text>
            </View>
            <View style={styles.feature}>
              <Icon name="lock-closed" type="ionicon" size={24} color="#9C27B0" />
              <Text style={styles.featureText}>Payment Protection</Text>
            </View>
          </View>

          <Button
            title="Enable Biometric Authentication"
            onPress={handleEnableBiometric}
            loading={loading}
            buttonStyle={styles.enableButton}
            titleStyle={styles.enableButtonText}
          />

          <Button title="Skip for Now" type="clear" onPress={handleSkip} titleStyle={styles.skipButtonText} />
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    fontWeight: "500",
  },
  enableButton: {
    borderRadius: 12,
    height: 50,
    backgroundColor: "#E91E63",
    marginBottom: 16,
  },
  enableButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  skipButtonText: {
    fontSize: 16,
    color: "#6B7280",
  },
})
