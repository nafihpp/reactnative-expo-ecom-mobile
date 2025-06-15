"use client"
import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native"
import { Text } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useSecureAuth } from "../../hooks/useSecureAuth"

const { width } = Dimensions.get("window")

interface OTPScreenProps {
  navigation: any
  route: any
}

export default function OTPScreen({ navigation, route }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(27)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { login } = useSecureAuth()

  const phoneNumber = route?.params?.phoneNumber || "+971 55 910 5303"

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all digits are entered
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOTP(newOtp.join(""))
    }
  }

  const handleKeypadPress = (value: string) => {
    const currentIndex = otp.findIndex((digit) => digit === "")

    if (value === "backspace") {
      const lastFilledIndex = otp
        .map((digit, index) => (digit !== "" ? index : -1))
        .filter((i) => i !== -1)
        .pop()
      if (lastFilledIndex !== undefined) {
        const newOtp = [...otp]
        newOtp[lastFilledIndex] = ""
        setOtp(newOtp)
        inputRefs.current[lastFilledIndex]?.focus()
      }
    } else if (currentIndex !== -1 && currentIndex < 6) {
      handleOtpChange(value, currentIndex)
    }
  }

  const handleVerifyOTP = async (otpCode?: string) => {
    const codeToVerify = otpCode || otp.join("")

    if (codeToVerify.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code")
      return
    }

    setLoading(true)

    try {
      const success = await login("phone", { phoneNumber })

      if (success) {
        navigation.navigate("BiometricSetup")
      } else {
        throw new Error("OTP verification failed")
      }
    } catch (error) {
      Alert.alert("Error", "Verification failed. Please try again.")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = () => {
    if (!canResend) return

    setResendTimer(27)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()

    Alert.alert("Code Sent", "A new verification code has been sent to your phone")
  }

  const keypadNumbers = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.addressContainer}>
          <View style={styles.addressIcon}>
            <Icon name="storefront" type="ionicon" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressLabel}>ShopEase</Text>
            <Text style={styles.addressText}>Your Shopping Destination</Text>
          </View>
          <Icon name="chevron-down" type="ionicon" size={20} color="#6B7280" />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" type="ionicon" size={24} color="#111827" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Icon name="log-in-outline" type="ionicon" size={40} color="#6B7280" />
          </View>
        </View>

        {/* Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Verify your phone number</Text>
          <Text style={styles.description}>
            Please enter the confirmation code we sent to:{"\n"}
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : styles.otpInputEmpty,
                index === 0 && !digit ? styles.otpInputActive : null,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              showSoftInputOnFocus={false}
            />
          ))}
        </View>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendQuestion}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
            <Text style={[styles.resendText, canResend ? styles.resendActive : styles.resendDisabled]}>
              {canResend ? "Resend code" : `Resend in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        <View style={styles.keypadGrid}>
          {keypadNumbers.map((key) => (
            <TouchableOpacity
              key={key.number}
              style={styles.keypadButton}
              onPress={() => handleKeypadPress(key.number)}
            >
              <Text style={styles.keypadNumber}>{key.number}</Text>
              {key.letters ? <Text style={styles.keypadLetters}>{key.letters}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadBottomRow}>
          <View style={styles.keypadButton} />
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleKeypadPress("0")}>
            <Text style={styles.keypadNumber}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keypadButton} onPress={() => handleKeypadPress("backspace")}>
            <Icon name="backspace-outline" type="ionicon" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Globe Icon */}
        <View style={styles.globeContainer}>
          <Icon name="globe-outline" type="ionicon" size={24} color="#6B7280" />
        </View>
      </View>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 4,
  },
  iconContainer: {
    alignItems: "center",
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
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  phoneNumber: {
    fontWeight: "600",
    color: "#111827",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 12,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  otpInputEmpty: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  otpInputFilled: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  otpInputActive: {
    borderColor: "#E91E63",
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  resendQuestion: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 8,
  },
  resendText: {
    fontSize: 16,
  },
  resendActive: {
    color: "#E91E63",
    fontWeight: "600",
  },
  resendDisabled: {
    color: "#9CA3AF",
  },
  keypad: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  keypadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  keypadBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  keypadButton: {
    width: (width - 60) / 3,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginBottom: 10,
  },
  keypadNumber: {
    fontSize: 24,
    fontWeight: "400",
    color: "#111827",
  },
  keypadLetters: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  globeContainer: {
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})
