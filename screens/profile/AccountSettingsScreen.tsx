"use client"

import { StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Input, Button, Switch, ListItem } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useState } from "react"
import { useSecureAuth } from "../../hooks/useSecureAuth"
import type { NavigationProps } from "../../types"

export default function AccountSettingsScreen({ navigation }: NavigationProps): JSX.Element {
  const { user } = useSecureAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "user@shopease.com",
    phone: user?.phone || "+971 55 910 5303",
  })
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true)
  const [pushNotifications, setPushNotifications] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSave = async (): Promise<void> => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      Alert.alert("Success", "Account settings updated successfully")
      setLoading(false)
    }, 1500)
  }

  const handleDeleteAccount = (): void => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => Alert.alert("Account Deletion", "Account deletion feature will be implemented"),
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Input
          label="Full Name"
          value={formData.name}
          onChangeText={(value: string) => setFormData({ ...formData, name: value })}
          leftIcon={<Icon name="person-outline" type="ionicon" size={20} color="#666" />}
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(value: string) => setFormData({ ...formData, email: value })}
          keyboardType="email-address"
          leftIcon={<Icon name="mail-outline" type="ionicon" size={20} color="#666" />}
        />

        <Input
          label="Phone Number"
          value={formData.phone}
          onChangeText={(value: string) => setFormData({ ...formData, phone: value })}
          keyboardType="phone-pad"
          leftIcon={<Icon name="call-outline" type="ionicon" size={20} color="#666" />}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="mail-outline" type="ionicon" size={20} color="#E91E63" />
          <ListItem.Content>
            <ListItem.Title>Email Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive updates via email</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="notifications-outline" type="ionicon" size={20} color="#FF9500" />
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive push notifications</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("Address")} containerStyle={styles.listItem}>
          <Icon name="location-outline" type="ionicon" size={20} color="#2196F3" />
          <ListItem.Content>
            <ListItem.Title>Delivery Addresses</ListItem.Title>
            <ListItem.Subtitle>Manage your delivery addresses</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("NotificationSettings")} containerStyle={styles.listItem}>
          <Icon name="settings-outline" type="ionicon" size={20} color="#9C27B0" />
          <ListItem.Content>
            <ListItem.Title>Notification Settings</ListItem.Title>
            <ListItem.Subtitle>Customize your notifications</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={() => navigation.navigate("PrivacySecurity")} containerStyle={styles.listItem}>
          <Icon name="shield-outline" type="ionicon" size={20} color="#34C759" />
          <ListItem.Content>
            <ListItem.Title>Privacy & Security</ListItem.Title>
            <ListItem.Subtitle>Manage privacy settings</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>

      <Card containerStyle={styles.card}>
        <Button title="Save Changes" onPress={handleSave} loading={loading} buttonStyle={styles.saveButton} />
      </Card>

      <Card containerStyle={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          buttonStyle={styles.deleteButton}
          titleStyle={styles.deleteButtonText}
          type="outline"
        />
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
  saveButton: {
    borderRadius: 8,
    height: 50,
    backgroundColor: "#E91E63",
  },
  dangerCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
    marginBottom: 15,
  },
  deleteButton: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  deleteButtonText: {
    color: "#FF3B30",
  },
})
