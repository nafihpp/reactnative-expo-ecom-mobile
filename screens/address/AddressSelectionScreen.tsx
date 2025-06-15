"use client"

import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Text, Card, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Address, NavigationProps } from "../types"

interface AddressSelectionScreenProps extends NavigationProps {
  route: {
    params: {
      addresses: Address[]
      selectedAddressId?: string
      onSelect: (address: Address) => void
    }
  }
}

export default function AddressSelectionScreen({ navigation, route }: AddressSelectionScreenProps): JSX.Element {
  const { addresses, selectedAddressId, onSelect } = route.params

  const handleSelectAddress = (address: Address): void => {
    onSelect(address)
    navigation.goBack()
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
    <TouchableOpacity onPress={() => handleSelectAddress(item)}>
      <Card containerStyle={[styles.addressCard, selectedAddressId === item.id && styles.selectedCard]}>
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
          {selectedAddressId === item.id && <Icon name="checkmark-circle" type="ionicon" size={24} color="#4CAF50" />}
        </View>

        <Text style={styles.addressText}>{item.street}</Text>
        <Text style={styles.addressText}>
          {item.city}, {item.state} {item.zipCode}
        </Text>
        <Text style={styles.addressText}>{item.country}</Text>
        {item.phone && <Text style={styles.phoneText}>{item.phone}</Text>}
        {item.instructions && <Text style={styles.instructionsText}>Note: {item.instructions}</Text>}
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Delivery Address</Text>
        <Button
          title="Add New"
          buttonStyle={styles.addButton}
          onPress={() => navigation.navigate("AddAddress", { isEdit: false })}
        />
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item: Address) => item.id}
        contentContainerStyle={styles.addressList}
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 18,
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#F8FFF8",
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
})
