"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { Text, Card, Button, Avatar, Divider } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { CartItem, NavigationProps } from "../../types"

export default function CartScreen({ navigation }: NavigationProps): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1199,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
    {
      id: "2",
      name: "Nike Air Jordan",
      price: 189,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 2,
      size: "M",
      color: "Black",
    },
    {
      id: "3",
      name: "Designer Handbag",
      price: 299,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      color: "Brown",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number): void => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items: CartItem[]) =>
      items.map((item: CartItem) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeItem = (id: string): void => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item from your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setCartItems((items: CartItem[]) => items.filter((item: CartItem) => item.id !== id)),
      },
    ])
  }

  const subtotal: number = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  const shipping: number = subtotal > 50 ? 0 : 9.99
  const tax: number = subtotal * 0.08
  const total: number = subtotal + shipping + tax

  const renderCartItem = ({ item }: { item: CartItem }): JSX.Element => (
    <Card containerStyle={styles.cartItemCard}>
      <View style={styles.cartItemContainer}>
        <Avatar size={80} source={{ uri: item.image }} containerStyle={styles.itemImage} />

        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          {item.size && <Text style={styles.itemOption}>Size: {item.size}</Text>}
          {item.color && <Text style={styles.itemOption}>Color: {item.color}</Text>}
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>

        <View style={styles.itemActions}>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
            <Icon name="trash-outline" type="ionicon" size={20} color="#FF5722" />
          </TouchableOpacity>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
              <Icon name="remove" type="ionicon" size={16} color="#E91E63" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
              <Icon name="add" type="ionicon" size={16} color="#E91E63" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  )

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="bag-outline" type="ionicon" size={80} color="#CCC" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some products to get started</Text>
        <Button
          title="Continue Shopping"
          buttonStyle={styles.continueShoppingButton}
          onPress={() => navigation.navigate("Shop")}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item: CartItem) => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Order Summary */}
      <Card containerStyle={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>

        <Divider style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        {shipping > 0 && (
          <Text style={styles.shippingNote}>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</Text>
        )}

        <Button
          title="Proceed to Checkout"
          buttonStyle={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout", { cartItems, total })}
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
  cartList: {
    padding: 15,
    paddingBottom: 0,
  },
  cartItemCard: {
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  itemOption: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E91E63",
    marginTop: 5,
  },
  itemActions: {
    alignItems: "center",
  },
  removeButton: {
    padding: 5,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 15,
  },
  summaryCard: {
    margin: 15,
    borderRadius: 12,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  summaryDivider: {
    marginVertical: 15,
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
  shippingNote: {
    fontSize: 12,
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    height: 50,
    marginTop: 10,
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
  continueShoppingButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
})
