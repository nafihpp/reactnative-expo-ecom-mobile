"use client"

import { View, StyleSheet, ScrollView, Alert, Linking } from "react-native"
import { Text, Card, ListItem, Button, Input } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useState } from "react"
import type { NavigationProps } from "../../types"

export default function HelpSupportScreen({ navigation }: NavigationProps): JSX.Element {
  const [feedbackText, setFeedbackText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleContactSupport = (): void => {
    Alert.alert("Contact Support", "Live chat will be available soon")
  }

  const handleEmailSupport = (): void => {
    Linking.openURL("mailto:support@shopease.com?subject=ShopEase Support Request")
  }

  const handleCallSupport = (): void => {
    Linking.openURL("tel:+971-800-SHOPEASE")
  }

  const handleFAQ = (): void => {
    navigation.navigate("FAQ")
  }

  const handleReportBug = (): void => {
    navigation.navigate("ReportBug")
  }

  const handleSubmitFeedback = async (): Promise<void> => {
    if (!feedbackText.trim()) {
      Alert.alert("Error", "Please enter your feedback")
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      Alert.alert("Thank You!", "Your feedback has been submitted successfully")
      setFeedbackText("")
    } catch (error) {
      Alert.alert("Error", "Failed to submit feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const supportItems = [
    {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      icon: "help-circle-outline",
      color: "#2196F3",
      onPress: handleFAQ,
    },
    {
      title: "Live Chat Support",
      subtitle: "Chat with our support team",
      icon: "chatbubble-outline",
      color: "#4CAF50",
      onPress: handleContactSupport,
    },
    {
      title: "Email Support",
      subtitle: "Send us an email",
      icon: "mail-outline",
      color: "#FF9500",
      onPress: handleEmailSupport,
    },
    {
      title: "Call Support",
      subtitle: "Speak with a representative",
      icon: "call-outline",
      color: "#9C27B0",
      onPress: handleCallSupport,
    },
    {
      title: "Report a Bug",
      subtitle: "Help us improve the app",
      icon: "bug-outline",
      color: "#FF5722",
      onPress: handleReportBug,
    },
  ]

  const quickHelp = [
    {
      title: "How to place an order?",
      subtitle: "Step-by-step guide to ordering",
      icon: "bag-outline",
    },
    {
      title: "Track your order",
      subtitle: "Find your order status",
      icon: "location-outline",
    },
    {
      title: "Return & Refund",
      subtitle: "Return policy and process",
      icon: "return-up-back-outline",
    },
    {
      title: "Payment Issues",
      subtitle: "Resolve payment problems",
      icon: "card-outline",
    },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* Contact Support */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        {supportItems.map((item, index) => (
          <ListItem key={index} onPress={item.onPress} containerStyle={styles.listItem}>
            <Icon name={item.icon} type="ionicon" size={20} color={item.color} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </Card>

      {/* Quick Help */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Quick Help</Text>
        {quickHelp.map((item, index) => (
          <ListItem key={index} containerStyle={styles.listItem}>
            <Icon name={item.icon} type="ionicon" size={20} color="#666" />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </Card>

      {/* Feedback */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Send Feedback</Text>
        <Input
          placeholder="Tell us how we can improve..."
          value={feedbackText}
          onChangeText={setFeedbackText}
          multiline
          numberOfLines={4}
          inputStyle={styles.feedbackInput}
        />
        <Button
          title="Submit Feedback"
          onPress={handleSubmitFeedback}
          loading={loading}
          buttonStyle={styles.feedbackButton}
          icon={<Icon name="send" type="ionicon" size={16} color="white" />}
        />
      </Card>

      {/* App Information */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>2024.01.15</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>React Native</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Support Hours</Text>
          <Text style={styles.infoValue}>24/7</Text>
        </View>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  feedbackInput: {
    textAlignVertical: "top",
    minHeight: 80,
  },
  feedbackButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
})
