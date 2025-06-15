"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Input, Button, CheckBox } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Address, NavigationProps } from "../types"

interface AddAddressScreenProps extends NavigationProps {
  route: {
    params: {
      address?: Address
      isEdit: boolean
    }
  }
}

export default function AddAddressScreen({ navigation, route }: AddAddressScreenProps): JSX.Element {
  const { address, isEdit } = route.params
  const [loading, setLoading] = useState<boolean>(false)

  const [formData, setFormData] = useState<Omit<Address, "id">>({
    type: address?.type || "home",
    name: address?.name || "",
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    country: address?.country || "UAE",
    phone: address?.phone || "",
    isDefault: address?.isDefault || false,
    instructions: address?.instructions || "",
  })

  const addressTypes = [
    { key: "home", label: "Home", icon: "home" },
    { key: "work", label: "Work", icon: "business" },
    { key: "other", label: "Other", icon: "location" },
  ]

  const updateFormData = (field: keyof typeof formData, value: string | boolean): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter address name")
      return false
    }
    if (!formData.street.trim()) {
      Alert.alert("Error", "Please enter street address")
      return false
    }
    if (!formData.city.trim()) {
      Alert.alert("Error", "Please enter city")
      return false
    }
    if (!formData.state.trim()) {
      Alert.alert("Error", "Please enter state")
      return false
    }
    if (!formData.zipCode.trim()) {
      Alert.alert("Error", "Please enter zip code")
      return false
    }
    return true
  }

  const handleSave = async (): Promise<void> => {
    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      Alert.alert("Success", `Address ${isEdit ? "updated" : "added"} successfully`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to save address. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Address Type</Text>
        <View style={styles.typeContainer}>
          {addressTypes.map((type) => (
            <CheckBox
              key={type.key}
              title={type.label}
              checked={formData.type === type.key}
              onPress={() => updateFormData("type", type.key)}
              checkedIcon="radio-button-on"
              uncheckedIcon="radio-button-off"
              containerStyle={styles.radioContainer}
            />
          ))}
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Address Details</Text>

        <Input
          label="Address Name"
          placeholder="e.g., Home, Office"
          value={formData.name}
          onChangeText={(value: string) => updateFormData("name", value)}
          leftIcon={<Icon name="bookmark-outline" type="ionicon" size={20} color="#666" />}
        />

        <Input
          label="Street Address"
          placeholder="Street, building, apartment"
          value={formData.street}
          onChangeText={(value: string) => updateFormData("street", value)}
          multiline
          numberOfLines={2}
          leftIcon={<Icon name="location-outline" type="ionicon" size={20} color="#666" />}
        />

        <View style={styles.row}>
          <Input
            label="City"
            placeholder="City"
            value={formData.city}
            onChangeText={(value: string) => updateFormData("city", value)}
            containerStyle={styles.halfInput}
          />
          <Input
            label="State"
            placeholder="State"
            value={formData.state}
            onChangeText={(value: string) => updateFormData("state", value)}
            containerStyle={styles.halfInput}
          />
        </View>

        <View style={styles.row}>
          <Input
            label="Zip Code"
            placeholder="12345"
            value={formData.zipCode}
            onChangeText={(value: string) => updateFormData("zipCode", value)}
            keyboardType="numeric"
            containerStyle={styles.halfInput}
          />
          <Input
            label="Country"
            placeholder="Country"
            value={formData.country}
            onChangeText={(value: string) => updateFormData("country", value)}
            containerStyle={styles.halfInput}
          />
        </View>

        <Input
          label="Phone Number (Optional)"
          placeholder="+971 55 910 5303"
          value={formData.phone}
          onChangeText={(value: string) => updateFormData("phone", value)}
          keyboardType="phone-pad"
          leftIcon={<Icon name="call-outline" type="ionicon" size={20} color="#666" />}
        />

        <Input
          label="Delivery Instructions (Optional)"
          placeholder="e.g., Ring the doorbell, Leave at door"
          value={formData.instructions}
          onChangeText={(value: string) => updateFormData("instructions", value)}
          multiline
          numberOfLines={2}
          leftIcon={<Icon name="document-text-outline" type="ionicon" size={20} color="#666" />}
        />

        <CheckBox
          title="Set as default address"
          checked={formData.isDefault}
          onPress={() => updateFormData("isDefault", !formData.isDefault)}
          containerStyle={styles.defaultCheckbox}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            type="outline"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
          />
          <Button
            title={isEdit ? "Update Address" : "Save Address"}
            onPress={handleSave}
            loading={loading}
            buttonStyle={styles.saveButton}
          />
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
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  defaultCheckbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    borderColor: "#8E8E93",
  },
  cancelButtonText: {
    color: "#8E8E93",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
  },
})
