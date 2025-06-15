"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Text, Card, Button, Divider, ListItem } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { CartItem, Address, NavigationProps } from "../types"

interface CheckoutScreenProps extends NavigationProps {
  route: {
    params: {
      cartItems: CartItem[]
      total: number
    }
  }
}

export default function CheckoutScreen({ navigation, route }: CheckoutScreenProps): JSX.Element {
  const { cartItems, total } = route.params
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [loading, setLoading] = useState<boolean>(false)

  // Mock addresses - in real app, fetch from user's saved addresses
  const addresses: Address[] = [
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
    },
  ]

  useState(() => {
    // Set default address on load
    const defaultAddress = addresses.find((addr: Address) => addr.isDefault)
    if (defaultAddress) {
      setSelectedAddress(defaultAddress)
    }
  })

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "card" },
    { id: "cash", name: "Cash on Delivery", icon: "cash" },
    { id: "wallet", name: "Digital Wallet", icon: "wallet" },
  ]

  const handlePlaceOrder = async (): Promise<void> => {
    if (!selectedAddress) {
      Alert.alert("Error", "Please select a delivery address")
      return
    }

    setLoading(true)

    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      Alert.alert(
        "Order Placed!",
        "Your order has been placed successfully. You will receive a confirmation shortly.",
        [
          {
            text: "View Orders",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
              })
              navigation.navigate("Orders")
            },
          },
        ],
      )
    } catch (error) {
      Alert.alert("Error", "Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddressSelect = (): void => {
    navigation.navigate("AddressSelection", {
      addresses,
      selectedAddressId: selectedAddress?.id,
      onSelect: (address: Address) => setSelectedAddress(address),
    })
  }

  return (
    <ScrollView style={styles.container}>
      {/* Delivery Address */}
      <Card containerStyle={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Button title="Change" type="clear" titleStyle={styles.changeText} onPress={handleAddressSelect} />
        </View>

        {selectedAddress ? (
          <View style={styles.addressContainer}>
            <View style={styles.addressHeader}>
              <Icon name="location" type="ionicon" size={20} color="#E91E63" />
              <Text style={styles.addressName}>{selectedAddress.name}</Text>
              {selectedAddress.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>DEFAULT</Text>
                </View>
              )}
            </View>
            <Text style={styles.addressText}>{selectedAddress.street}</Text>
            <Text style={styles.addressText}>
              {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
            </Text>
            <Text style={styles.phoneText}>{selectedAddress.phone}</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.addAddressButton} onPress={handleAddressSelect}>
            <Icon name="add-circle-outline" type="ionicon" size={24} color="#E91E63" />
            <Text style={styles.addAddressText}>Select Delivery Address</Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* Order Summary */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.slice(0, 3).map((item: CartItem) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        {cartItems.length > 3 && <Text style={styles.moreItems}>+{cartItems.length - 3} more items</Text>}
      </Card>

      {/* Payment Method */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <ListItem key={method.id} onPress={() => setPaymentMethod(method.id)} containerStyle={styles.paymentItem}>
            <Icon name={method.icon} type="ionicon" size={20} color="#666" />
            <ListItem.Content>
              <ListItem.Title>{method.name}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name={paymentMethod === method.id ? "radio-button-on" : "radio-button-off"}
              type="ionicon"
              size={20}
              color={paymentMethod === method.id ? "#E91E63" : "#CCC"}
            />
          </ListItem>
        ))}
      </Card>

      {/* Price Breakdown */}
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Price Details</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal ({cartItems.length} items)</Text>
          <Text style={styles.priceValue}>${(total - 9.99 - total * 0.08).toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Delivery Fee</Text>
          <Text style={styles.priceValue}>$9.99</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tax</Text>
          <Text style={styles.priceValue}>${(total * 0.08).toFixed(2)}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </Card>

      {/* Place Order Button */}
      <Card containerStyle={styles.card}>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          loading={loading}
          buttonStyle={styles.placeOrderButton}
          titleStyle={styles.placeOrderText}
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  changeText: {
    color: "#E91E63",
    fontSize: 14,
  },
  addressContainer: {
    padding: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
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
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#E91E63",
    borderStyle: "dashed",
    borderRadius: 8,
  },
  addAddressText: {
    color: "#E91E63",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  itemQuantity: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E91E63",
  },
  moreItems: {
    fontSize: 12,
    color: "#E91E63",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  paymentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E91E63",
  },
  placeOrderButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: "600",
  },
})
