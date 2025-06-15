"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Switch, ListItem, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { NavigationProps } from "../../types"

interface NotificationSetting {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  enabled: boolean
}

export default function NotificationSettingsScreen({ navigation }: NavigationProps): JSX.Element {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "order_updates",
      title: "Order Updates",
      subtitle: "Get notified about order status changes",
      icon: "bag-outline",
      color: "#E91E63",
      enabled: true,
    },
    {
      id: "promotions",
      title: "Promotions & Offers",
      subtitle: "Receive notifications about deals and discounts",
      icon: "pricetag-outline",
      color: "#FF9500",
      enabled: true,
    },
    {
      id: "new_arrivals",
      title: "New Arrivals",
      subtitle: "Be the first to know about new products",
      icon: "sparkles-outline",
      color: "#9C27B0",
      enabled: false,
    },
    {
      id: "wishlist",
      title: "Wishlist Updates",
      subtitle: "Get notified when wishlist items go on sale",
      icon: "heart-outline",
      color: "#FF5722",
      enabled: true,
    },
    {
      id: "delivery",
      title: "Delivery Updates",
      subtitle: "Track your deliveries in real-time",
      icon: "location-outline",
      color: "#2196F3",
      enabled: true,
    },
    {
      id: "reviews",
      title: "Review Reminders",
      subtitle: "Reminders to review your purchases",
      icon: "star-outline",
      color: "#FFD700",
      enabled: false,
    },
    {
      id: "security",
      title: "Security Alerts",
      subtitle: "Important security and account notifications",
      icon: "shield-outline",
      color: "#34C759",
      enabled: true,
    },
  ])

  const [emailNotifications, setEmailNotifications] = useState<boolean>(true)
  const [pushNotifications, setPushNotifications] = useState<boolean>(true)
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const toggleSetting = (id: string): void => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const handleSave = async (): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      Alert.alert("Success", "Notification settings updated successfully")
    } catch (error) {
      Alert.alert("Error", "Failed to update settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleTestNotification = (): void => {
    Alert.alert("Test Notification", "This is a test notification to verify your settings are working correctly.")
  }

  return (
    <ScrollView style={styles.container}>
      {/* Notification Methods */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Notification Methods</Text>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="notifications-outline" type="ionicon" size={20} color="#E91E63" />
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive notifications on your device</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="mail-outline" type="ionicon" size={20} color="#2196F3" />
          <ListItem.Content>
            <ListItem.Title>Email Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive notifications via email</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="chatbubble-outline" type="ionicon" size={20} color="#4CAF50" />
          <ListItem.Content>
            <ListItem.Title>SMS Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive important updates via SMS</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={smsNotifications}
            onValueChange={setSmsNotifications}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>
      </Card>

      {/* Notification Categories */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Notification Categories</Text>
        {settings.map((setting) => (
          <ListItem key={setting.id} containerStyle={styles.listItem}>
            <Icon name={setting.icon} type="ionicon" size={20} color={setting.color} />
            <ListItem.Content>
              <ListItem.Title>{setting.title}</ListItem.Title>
              <ListItem.Subtitle>{setting.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
              thumbColor="#FFFFFF"
            />
          </ListItem>
        ))}
      </Card>

      {/* Quiet Hours */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Quiet Hours</Text>
        <ListItem containerStyle={styles.listItem}>
          <Icon name="moon-outline" type="ionicon" size={20} color="#9C27B0" />
          <ListItem.Content>
            <ListItem.Title>Do Not Disturb</ListItem.Title>
            <ListItem.Subtitle>10:00 PM - 8:00 AM</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>

      {/* Actions */}
      <Card containerStyle={styles.card}>
        <View style={styles.actionButtons}>
          <Button
            title="Test Notification"
            type="outline"
            onPress={handleTestNotification}
            buttonStyle={styles.testButton}
            titleStyle={styles.testButtonText}
          />
          <Button title="Save Settings" onPress={handleSave} loading={loading} buttonStyle={styles.saveButton} />
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
  actionButtons: {
    flexDirection: "row",
    gap: 15,
  },
  testButton: {
    flex: 1,
    borderColor: "#E91E63",
  },
  testButtonText: {
    color: "#E91E63",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
  },
})
