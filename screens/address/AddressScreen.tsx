"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { Text, Card, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Address, NavigationProps } from "../../types"

export default function AddressScreen({ navigation }: NavigationProps): JSX.Element {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "Home",
      street: "123 Main Street, Apt 4B",
      city: "Dubai",
      state: "Dubai",
      zipCode: "12345",
      country: "UAE",
      phone: "+971 55 910 5303",
      isDefault: true,
      instructions: "Ring the doorbell twice",
    },
    {
      id: "2",
      type: "work",
      name: "Office",
      street: "456 Business District",
      city: "Dubai",
      state: "Dubai",
      zipCode: "54321",
      country: "UAE",
      phone: "+971 55 910 5303",
      isDefault: false,
      instructions: "Reception desk on ground floor",
    },
    {
      id: "3",
      type: "other",
      name: "Mom's House",
      street: "789 Family Lane",
      city: "Abu Dhabi",
      state: "Abu Dhabi",
      zipCode: "67890",
      country: "UAE",
      isDefault: false,
    },
  ])

  const setDefaultAddress = (addressId: string): void => {
    setAddresses((prevAddresses: Address[]) =>
      prevAddresses.map((address: Address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    )
    Alert.alert("Success", "Default address updated successfully")
  }

  const deleteAddress = (addressId: string): void => {
    const addressToDelete = addresses.find((addr: Address) => addr.id === addressId)

    if (addressToDelete?.isDefault && addresses.length > 1) {
      Alert.alert("Cannot Delete", "Cannot delete default address. Please set another address as default first.")
      return
    }

    Alert.alert("Delete Address", "Are you sure you want to delete this address?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setAddresses((prevAddresses: Address[]) =>
            prevAddresses.filter((address: Address) => address.id !== addressId),
          )
        },
      },
    ])
  }

  const getAddressTypeIcon = (type: string): string => {
    switch (type) {
      case "home":
        return "home"
      case "work":
        return "business"
      case "other":
        return "location"
      default:
        return "location"
    }
  }

  const getAddressTypeColor = (type: string): string => {
    switch (type) {
      case "home":
        return "#4CAF50"
      case "work":
        return "#2196F3"
      case "other":
        return "#FF9800"
      default:
        return "#666"
    }
  }

  const renderAddress = ({ item }: { item: Address }): JSX.Element => (
    <Card containerStyle={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTitleContainer}>
          <Icon
            name={getAddressTypeIcon(item.type)}
            type="ionicon"
            size={20}
            color={getAddressTypeColor(item.type)}
            containerStyle={styles.addressIcon}
          />
          <Text style={styles.addressName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>DEFAULT</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AddAddress", { address: item, isEdit: true })}
        >
          <Icon name="pencil" type="ionicon" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.addressText}>{item.street}</Text>
      <Text style={styles.addressText}>
        {item.city}, {item.state} {item.zipCode}
      </Text>
      <Text style={styles.addressText}>{item.country}</Text>
      {item.phone && <Text style={styles.phoneText}>{item.phone}</Text>}
      {item.instructions && <Text style={styles.instructionsText}>Note: {item.instructions}</Text>}

      <View style={styles.addressActions}>
        {!item.isDefault && (
          <Button
            title="Set as Default"
            type="outline"
            buttonStyle={styles.defaultButton}
            titleStyle={styles.defaultButtonText}
            onPress={() => setDefaultAddress(item.id)}
          />
        )}
        <Button
          title="Delete"
          type="outline"
          buttonStyle={styles.deleteButton}
          titleStyle={styles.deleteButtonText}
          onPress={() => deleteAddress(item.id)}
        />
      </View>
    </Card>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery Addresses</Text>
        <Button
          title="Add New"
          buttonStyle={styles.addButton}
          onPress={() => navigation.navigate("AddAddress", { isEdit: false })}
        />
      </View>

      {addresses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="location-outline" type="ionicon" size={80} color="#CCC" />
          <Text style={styles.emptyTitle}>No addresses added</Text>
          <Text style={styles.emptySubtitle}>Add your delivery address to get started</Text>
          <Button
            title="Add Address"
            buttonStyle={styles.addFirstButton}
            onPress={() => navigation.navigate("AddAddress", { isEdit: false })}
          />
        </View>
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderAddress}
          keyExtractor={(item: Address) => item.id}
          contentContainerStyle={styles.addressList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  addressList: {
    padding: 15,
  },
  addressCard: {
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressIcon: {
    marginRight: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  editButton: {
    padding: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginTop: 5,
  },
  instructionsText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginTop: 5,
  },
  addressActions: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  defaultButton: {
    flex: 1,
    borderColor: "#4CAF50",
    height: 35,
  },
  defaultButtonText: {
    color: "#4CAF50",
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    borderColor: "#FF5722",
    height: 35,
  },
  deleteButtonText: {
    color: "#FF5722",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  addFirstButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
})
