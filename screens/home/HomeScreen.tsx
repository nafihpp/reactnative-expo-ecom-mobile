"use client"

import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from "react-native"
import { Text, Card, Button, Avatar, SearchBar } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useState } from "react"
import type { Product, Category, Deal, NavigationProps } from "../../types"

const { width } = Dimensions.get("window")

export default function HomeScreen({ navigation }: NavigationProps): JSX.Element {
  const [search, setSearch] = useState<string>("")

  const categories: Category[] = [
    { id: "1", name: "Electronics", icon: "phone-portrait", color: "#2196F3" },
    { id: "2", name: "Fashion", icon: "shirt", color: "#E91E63" },
    { id: "3", name: "Home", icon: "home", color: "#4CAF50" },
    { id: "4", name: "Beauty", icon: "flower", color: "#FF9800" },
    { id: "5", name: "Sports", icon: "fitness", color: "#9C27B0" },
    { id: "6", name: "Books", icon: "book", color: "#795548" },
  ]

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 999,
      originalPrice: 1099,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.8,
      category: "Electronics",
      brand: "Apple",
    },
    {
      id: "2",
      name: "Nike Air Max",
      price: 129,
      originalPrice: 159,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.6,
      category: "Sports",
      brand: "Nike",
    },
    {
      id: "3",
      name: "MacBook Pro",
      price: 1299,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.9,
      category: "Electronics",
      brand: "Apple",
    },
    {
      id: "4",
      name: "Designer Dress",
      price: 89,
      originalPrice: 120,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.4,
      category: "Fashion",
      brand: "Zara",
    },
  ]

  const deals: Deal[] = [
    { id: "1", title: "Flash Sale", subtitle: "Up to 70% off", color: "#FF5722" },
    { id: "2", title: "New Arrivals", subtitle: "Latest trends", color: "#E91E63" },
    { id: "3", title: "Free Shipping", subtitle: "On orders $50+", color: "#4CAF50" },
  ]

  const renderProduct = ({ item }: { item: Product }): JSX.Element => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Card containerStyle={styles.productCardContainer}>
        <View style={styles.productImage}>
          <Avatar size={80} source={{ uri: item.image }} />
          {item.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" type="ionicon" size={14} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.originalPrice && <Text style={styles.originalPrice}>${item.originalPrice}</Text>}
        </View>
      </Card>
    </TouchableOpacity>
  )

  const handleCategoryPress = (categoryName: string): void => {
    navigation.navigate("Shop", { category: categoryName })
  }

  const handleCartPress = (): void => {
    navigation.navigate("Cart")
  }

  const handleShopPress = (): void => {
    navigation.navigate("Shop")
  }

  const handleOrdersPress = (): void => {
    navigation.navigate("Orders")
  }

  const handleWishlistPress = (): void => {
    navigation.navigate("Wishlist")
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Find your perfect products</Text>
        </View>
        <TouchableOpacity onPress={handleCartPress}>
          <Icon name="bag" type="ionicon" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search products..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        inputStyle={styles.searchText}
        searchIcon={{ size: 20 }}
        clearIcon={{ size: 20 }}
      />

      {/* Categories */}
      <Card containerStyle={styles.categoriesCard}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category: Category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category.name)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Icon name={category.icon} type="ionicon" size={24} color="white" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Deals Banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsContainer}>
        {deals.map((deal: Deal) => (
          <Card key={deal.id} containerStyle={[styles.dealCard, { backgroundColor: deal.color }]}>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
          </Card>
        ))}
      </ScrollView>

      {/* Featured Products */}
      <Card containerStyle={styles.productsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <Button title="View All" type="clear" titleStyle={styles.viewAllText} onPress={handleShopPress} />
        </View>
        <FlatList
          data={featuredProducts}
          renderItem={renderProduct}
          keyExtractor={(item: Product) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      </Card>

      {/* Quick Actions */}
      <Card containerStyle={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <Button
            title="Track Order"
            icon={<Icon name="location" type="ionicon" size={20} color="white" />}
            buttonStyle={[styles.actionButton, { backgroundColor: "#2196F3" }]}
            onPress={handleOrdersPress}
          />
          <Button
            title="Wishlist"
            icon={<Icon name="heart" type="ionicon" size={20} color="white" />}
            buttonStyle={[styles.actionButton, { backgroundColor: "#E91E63" }]}
            onPress={handleWishlistPress}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 45,
  },
  searchText: {
    fontSize: 16,
  },
  categoriesCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  viewAllText: {
    color: "#E91E63",
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    width: (width - 80) / 3,
    marginBottom: 20,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  dealsContainer: {
    paddingLeft: 15,
    marginVertical: 5,
  },
  dealCard: {
    width: 200,
    marginRight: 10,
    padding: 20,
    borderRadius: 12,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  dealSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  productsCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  productsList: {
    paddingRight: 15,
  },
  productCard: {
    marginRight: 15,
  },
  productCardContainer: {
    width: 140,
    padding: 10,
    margin: 0,
  },
  productImage: {
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: -5,
    right: -5,
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
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    height: 35,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E91E63",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  actionsCard: {
    margin: 15,
    marginVertical: 5,
    marginBottom: 20,
    borderRadius: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
  },
})
