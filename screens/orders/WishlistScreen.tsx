"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { Text, Card, Button, Avatar } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { WishlistItem, NavigationProps } from "../types"

export default function WishlistScreen({ navigation }: NavigationProps): JSX.Element {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "/placeholder.svg?height=120&width=120",
      rating: 4.8,
      category: "Electronics",
      brand: "Apple",
      inStock: true,
    },
    {
      id: "2",
      name: "Designer Dress",
      price: 89,
      originalPrice: 120,
      image: "/placeholder.svg?height=120&width=120",
      rating: 4.4,
      category: "Fashion",
      brand: "Zara",
      inStock: false,
    },
    {
      id: "3",
      name: "MacBook Pro M3",
      price: 1599,
      image: "/placeholder.svg?height=120&width=120",
      rating: 4.9,
      category: "Electronics",
      brand: "Apple",
      inStock: true,
    },
  ])

  const removeFromWishlist = (id: string): void => {
    Alert.alert("Remove from Wishlist", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setWishlistItems((items: WishlistItem[]) => items.filter((item: WishlistItem) => item.id !== id)),
      },
    ])
  }

  const addToCart = (item: WishlistItem): void => {
    if (!item.inStock) {
      Alert.alert("Out of Stock", "This item is currently out of stock.")
      return
    }
    Alert.alert("Added to Cart", `${item.name} has been added to your cart!`)
  }

  const clearAllWishlist = (): void => {
    Alert.alert("Clear Wishlist", "Remove all items from your wishlist?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => setWishlistItems([]),
      },
    ])
  }

  const renderWishlistItem = ({ item }: { item: WishlistItem }): JSX.Element => (
    <Card containerStyle={styles.wishlistItemCard}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Avatar size={100} source={{ uri: item.image }} containerStyle={styles.itemImage} />
            {item.originalPrice && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                </Text>
              </View>
            )}
            {!item.inStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>

          <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.brandName}>{item.brand}</Text>

            <View style={styles.ratingContainer}>
              <Icon name="star" type="ionicon" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price}</Text>
              {item.originalPrice && <Text style={styles.originalPrice}>${item.originalPrice}</Text>}
            </View>

            <View style={styles.actionButtons}>
              <Button
                title={item.inStock ? "Add to Cart" : "Notify Me"}
                buttonStyle={[styles.addToCartButton, !item.inStock && styles.notifyButton]}
                titleStyle={styles.addToCartText}
                onPress={() => addToCart(item)}
                disabled={!item.inStock}
              />
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWishlist(item.id)}>
                <Icon name="heart" type="ionicon" size={20} color="#E91E63" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  )

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="heart-outline" type="ionicon" size={80} color="#CCC" />
        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
        <Text style={styles.emptySubtitle}>Save items you love for later</Text>
        <Button
          title="Start Shopping"
          buttonStyle={styles.startShoppingButton}
          onPress={() => navigation.navigate("Shop")}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist ({wishlistItems.length})</Text>
        <Button title="Clear All" type="clear" titleStyle={styles.clearAllText} onPress={clearAllWishlist} />
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item: WishlistItem) => item.id}
        contentContainerStyle={styles.wishlistList}
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  clearAllText: {
    color: "#E91E63",
    fontSize: 14,
  },
  wishlistList: {
    padding: 15,
  },
  wishlistItemCard: {
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
  },
  itemContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    borderRadius: 8,
  },
  discountBadge: {
    position: "absolute",
    top: -5,
    left: -5,
    backgroundColor: "#FF5722",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
  brandName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E91E63",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#E91E63",
    borderRadius: 6,
    height: 40,
  },
  notifyButton: {
    backgroundColor: "#666",
  },
  addToCartText: {
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
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
  startShoppingButton: {
    backgroundColor: "#E91E63",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
})
