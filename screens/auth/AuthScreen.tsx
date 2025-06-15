"use client"

import { useState } from "react"
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { Text, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useSecureAuth } from "../../hooks/useSecureAuth"

// Add navigation prop to the component
interface AuthScreenProps {
  navigation: any
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const { login } = useSecureAuth()

  const handlePhoneAuth = async () => {
    navigation.navigate("OTP", { phoneNumber: "+971 55 910 5303" })
  }

  const handleAppleAuth = async () => {
    setLoading("apple")
    try {
      const success = await login("apple")
      if (success) {
        navigation.navigate("BiometricSetup")
      }
    } catch (error) {
      Alert.alert("Error", "Apple authentication failed")
    } finally {
      setLoading(null)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading("google")
    try {
      const success = await login("google")
      if (success) {
        navigation.navigate("BiometricSetup")
      }
    } catch (error) {
      Alert.alert("Error", "Google authentication failed")
    } finally {
      setLoading(null)
    }
  }

  const openTerms = () => {
    Alert.alert("Terms of Service", "Terms of Service will open here")
  }

  const openPrivacy = () => {
    Alert.alert("Privacy Policy", "Privacy Policy will open here")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Auth Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Icon name="storefront-outline" type="ionicon" size={40} color="#6B7280" />
          </View>
        </View>

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome to ShopEase</Text>
          <Text style={styles.subtitle}>Sign up or log in to start shopping</Text>
        </View>

        {/* Country Selector */}
        <TouchableOpacity style={styles.countrySelector}>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>🇦🇪</Text>
          </View>
          <Icon name="chevron-down" type="ionicon" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Phone Number Button */}
        <Button
          title="Continue with phone number"
          onPress={handlePhoneAuth}
          loading={loading === "phone"}
          buttonStyle={styles.phoneButton}
          titleStyle={styles.phoneButtonText}
        />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Apple Button */}
        <Button
          title="Continue with Apple"
          onPress={handleAppleAuth}
          loading={loading === "apple"}
          buttonStyle={styles.appleButton}
          titleStyle={styles.appleButtonText}
          icon={<Icon name="logo-apple" type="ionicon" size={20} color="white" style={styles.buttonIcon} />}
        />

        {/* Google Button */}
        <Button
          title="Continue with Google"
          onPress={handleGoogleAuth}
          loading={loading === "google"}
          buttonStyle={styles.googleButton}
          titleStyle={styles.googleButtonText}
          icon={
            <View style={styles.googleIconContainer}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
          }
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By proceeding to use ShopEase, you agree to our{" "}
          <Text style={styles.linkText} onPress={openTerms}>
            terms of service
          </Text>{" "}
          and{" "}
          <Text style={styles.linkText} onPress={openPrivacy}>
            privacy policy
          </Text>
          .
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  phoneButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    backgroundColor: "#E91E63",
    marginBottom: 24,
  },
  phoneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#9CA3AF",
  },
  appleButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    backgroundColor: "#000000",
    marginBottom: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  googleButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E91E63",
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  googleIcon: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  linkText: {
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
})
