"use client"

import { useState } from "react"
import { StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Switch, ListItem, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { NavigationProps } from "../../types"

export default function PrivacySecurityScreen({ navigation }: NavigationProps): JSX.Element {
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false)
  const [dataCollection, setDataCollection] = useState<boolean>(true)
  const [personalizedAds, setPersonalizedAds] = useState<boolean>(false)
  const [analyticsSharing, setAnalyticsSharing] = useState<boolean>(true)
  const [locationTracking, setLocationTracking] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangePassword = (): void => {
    Alert.alert("Change Password", "Password change feature will be implemented")
  }

  const handleViewDataPolicy = (): void => {
    Alert.alert("Data Policy", "Data policy viewer will be implemented")
  }

  const handleExportData = (): void => {
    Alert.alert("Export Data", "Data export feature will be implemented")
  }

  const handleDeleteData = (): void => {
    Alert.alert(
      "Delete Personal Data",
      "Are you sure you want to delete all your personal data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => Alert.alert("Data Deletion", "Data deletion request submitted"),
        },
      ],
    )
  }

  const handleSave = async (): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      Alert.alert("Success", "Privacy settings updated successfully")
    } catch (error) {
      Alert.alert("Error", "Failed to update settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Security Settings */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Security</Text>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="finger-print" type="ionicon" size={20} color="#E91E63" />
          <ListItem.Content>
            <ListItem.Title>Biometric Authentication</ListItem.Title>
            <ListItem.Subtitle>Use fingerprint or face recognition</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="shield-checkmark" type="ionicon" size={20} color="#4CAF50" />
          <ListItem.Content>
            <ListItem.Title>Two-Factor Authentication</ListItem.Title>
            <ListItem.Subtitle>Add an extra layer of security</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem onPress={handleChangePassword} containerStyle={styles.listItem}>
          <Icon name="key-outline" type="ionicon" size={20} color="#FF9500" />
          <ListItem.Content>
            <ListItem.Title>Change Password</ListItem.Title>
            <ListItem.Subtitle>Update your account password</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>

      {/* Privacy Settings */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Privacy</Text>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="analytics-outline" type="ionicon" size={20} color="#2196F3" />
          <ListItem.Content>
            <ListItem.Title>Data Collection</ListItem.Title>
            <ListItem.Subtitle>Allow app to collect usage data</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={dataCollection}
            onValueChange={setDataCollection}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="megaphone-outline" type="ionicon" size={20} color="#9C27B0" />
          <ListItem.Content>
            <ListItem.Title>Personalized Ads</ListItem.Title>
            <ListItem.Subtitle>Show ads based on your interests</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={personalizedAds}
            onValueChange={setPersonalizedAds}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="share-outline" type="ionicon" size={20} color="#FF5722" />
          <ListItem.Content>
            <ListItem.Title>Analytics Sharing</ListItem.Title>
            <ListItem.Subtitle>Share anonymous usage analytics</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={analyticsSharing}
            onValueChange={setAnalyticsSharing}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="location-outline" type="ionicon" size={20} color="#607D8B" />
          <ListItem.Content>
            <ListItem.Title>Location Tracking</ListItem.Title>
            <ListItem.Subtitle>Allow location-based features</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={locationTracking}
            onValueChange={setLocationTracking}
            trackColor={{ false: "#E5E7EB", true: "#E91E63" }}
            thumbColor="#FFFFFF"
          />
        </ListItem>
      </Card>

      {/* Data Management */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Data Management</Text>

        <ListItem onPress={handleViewDataPolicy} containerStyle={styles.listItem}>
          <Icon name="document-text-outline" type="ionicon" size={20} color="#4CAF50" />
          <ListItem.Content>
            <ListItem.Title>View Data Policy</ListItem.Title>
            <ListItem.Subtitle>See how we handle your data</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={handleExportData} containerStyle={styles.listItem}>
          <Icon name="download-outline" type="ionicon" size={20} color="#2196F3" />
          <ListItem.Content>
            <ListItem.Title>Export My Data</ListItem.Title>
            <ListItem.Subtitle>Download a copy of your data</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem onPress={handleDeleteData} containerStyle={styles.listItem}>
          <Icon name="trash-outline" type="ionicon" size={20} color="#FF3B30" />
          <ListItem.Content>
            <ListItem.Title>Delete My Data</ListItem.Title>
            <ListItem.Subtitle>Permanently delete your personal data</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>

      {/* Save Button */}
      <Card containerStyle={styles.card}>
        <Button title="Save Settings" onPress={handleSave} loading={loading} buttonStyle={styles.saveButton} />
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
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
  },
})
