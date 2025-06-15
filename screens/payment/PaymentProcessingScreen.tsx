"use client"

import { useState } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Text, Card, Button, Input } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { CartItem, Address, NavigationProps } from "../../types"

interface PaymentProcessingScreenProps extends NavigationProps {
  route: {
    params: {
      amount: number
      cartItems: CartItem[]
      address: Address
      onSuccess: () => void
    }
  }
}

export default function PaymentProcessingScreen({ navigation, route }: PaymentProcessingScreenProps): JSX.Element {
  const { amount, cartItems, address, onSuccess } = route.params
  const [cardNumber, setCardNumber] = useState<string>("")
  const [expiryDate, setExpiryDate] = useState<string>("")
  const [cvv, setCvv] = useState<string>("")
  const [cardholderName, setCardholderName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)

  const formatCardNumber = (text: string): string => {
    const cleaned = text.replace(/\s/g, "")
    const match = cleaned.match(/.{1,4}/g)
    return match ? match.join(" ") : cleaned
  }

  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const validateCard = (): boolean => {
    if (cardNumber.replace(/\s/g, "").length < 16) {
      Alert.alert("Error", "Please enter a valid card number")
      return false
    }
    if (expiryDate.length < 5) {
      Alert.alert("Error", "Please enter a valid expiry date")
      return false
    }
    if (cvv.length < 3) {
      Alert.alert("Error", "Please enter a valid CVV")
      return false
    }
    if (cardholderName.trim().length < 2) {
      Alert.alert("Error", "Please enter cardholder name")
      return false
    }
    return true
  }

  const processPayment = async (): Promise<void> => {
    if (!validateCard()) return

    setLoading(true)
    setProcessing(true)

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate successful payment
      Alert.alert("Payment Successful!", `Your payment of $${amount.toFixed(2)} has been processed successfully.`, [
        {
          text: "View Order",
          onPress: () => {
            onSuccess()
          },
        },
      ])
    } catch (error) {
      Alert.alert("Payment Failed", "There was an error processing your payment. Please try again.")
    } finally {
      setLoading(false)
      setProcessing(false)
    }
  }

  const handleApplePay = async (): Promise<void> => {
    setLoading(true)
    try {
      // Simulate Apple Pay processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      Alert.alert("Apple Pay Successful!", "Your payment has been processed.", [
        {
          text: "View Order",
          onPress: () => onSuccess(),
        },
      ])
    } catch (error) {
      Alert.alert("Apple Pay Failed", "Please try again or use a different payment method.")
    } finally {
      setLoading(false)
    }
  }

  if (processing) {
    return (
      <View style={styles.processingContainer}>
        <Icon name="card" type="ionicon" size={80} color="#E91E63" />
        <Text style={styles.processingTitle}>Processing Payment...</Text>
        <Text style={styles.processingSubtitle}>Please wait while we process your payment securely</Text>
        <View style={styles.processingIndicator}>
          <Text style={styles.processingDots}>●●●</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Payment Amount */}
      <Card containerStyle={styles.amountCard}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
        </View>
      </Card>

      {/* Apple Pay Option */}
      <Card containerStyle={styles.card}>
        <Button
          title="Pay with Apple Pay"
          icon={<Icon name="logo-apple" type="ionicon" size={20} color="white" />}
          buttonStyle={styles.applePayButton}
          onPress={handleApplePay}
          loading={loading}
        />
      </Card>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or pay with card</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Card Payment Form */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Card Information</Text>

        <Input
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={(text: string) => setCardNumber(formatCardNumber(text))}
          keyboardType="numeric"
          maxLength={19}
          leftIcon={<Icon name="card" type="ionicon" size={20} color="#666" />}
        />

        <View style={styles.row}>
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={(text: string) => setExpiryDate(formatExpiryDate(text))}
            keyboardType="numeric"
            maxLength={5}
            containerStyle={styles.halfInput}
          />
          <Input
            label="CVV"
            placeholder="123"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            containerStyle={styles.halfInput}
          />
        </View>

        <Input
          label="Cardholder Name"
          placeholder="John Doe"
          value={cardholderName}
          onChangeText={setCardholderName}
          leftIcon={<Icon name="person" type="ionicon" size={20} color="#666" />}
        />
      </Card>

      {/* Security Info */}
      <Card containerStyle={styles.securityCard}>
        <View style={styles.securityInfo}>
          <Icon name="shield-checkmark" type="ionicon" size={24} color="#4CAF50" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Secure Payment</Text>
            <Text style={styles.securitySubtitle}>Your payment information is encrypted and secure</Text>
          </View>
        </View>
      </Card>

      {/* Pay Button */}
      <Card containerStyle={styles.card}>
        <Button
          title={`Pay $${amount.toFixed(2)}`}
          onPress={processPayment}
          loading={loading}
          buttonStyle={styles.payButton}
          titleStyle={styles.payButtonText}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  amountCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#E91E63",
  },
  amountContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  amountLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  applePayButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    height: 50,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  securityCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F8FFF8",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 12,
    color: "#666",
  },
  payButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 40,
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    marginBottom: 10,
  },
  processingSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  processingIndicator: {
    marginTop: 20,
  },
  processingDots: {
    fontSize: 24,
    color: "#E91E63",
    letterSpacing: 5,
  },
})
