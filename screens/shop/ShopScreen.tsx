"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert } from "react-native"
import { Text, Card, SearchBar, Button, Avatar, Overlay, CheckBox } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Product, NavigationProps } from "../../types"

const { width } = Dimensions.get("window")

interface ShopScreenProps extends NavigationProps {
  route?: {
    params?: {
      category?: string
    }
  }
}

export default function ShopScreen({ navigation, route }: ShopScreenProps): JSX.Element {
  const [search, setSearch] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>(route?.params?.category || "All")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categories: string[] = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports", "Books"]
  const brands: string[] = ["Apple", "Nike", "Samsung", "Adidas", "Sony", "LG"]

  const products: Product[] = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.8,
      category: "Electronics",
      brand: "Apple",
    },
    {
      id: "2",
      name: "Nike Air Jordan",
      price: 189,
      originalPrice: 220,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.6,
      category: "Sports",
      brand: "Nike",
    },
    {
      id: "3",
      name: "Samsung Galaxy S24",
      price: 899,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.7,
      category: "Electronics",
      brand: "Samsung",
    },
    {
      id: "4",
      name: "Designer Handbag",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.4,
      category: "Fashion",
      brand: "Gucci",
    },
    {
      id: "5",
      name: "MacBook Air M3",
      price: 1099,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.9,
      category: "Electronics",
      brand: "Apple",
    },
    {
      id: "6",
      name: "Adidas Ultraboost",
      price: 159,
      originalPrice: 180,
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.5,
      category: "Sports",
      brand: "Adidas",
    },
  ]

  const filteredProducts: Product[] = products.filter((product: Product) => {
    const matchesSearch: boolean = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory: boolean = selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice: boolean = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesBrand: boolean = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand
  })

  const toggleBrand = (brand: string): void => {
    setSelectedBrands((prev: string[]) =>
      prev.includes(brand) ? prev.filter((b: string) => b !== brand) : [...prev, brand],
    )
  }

  const clearFilters = (): void => {
    setSelectedCategory("All")
    setPriceRange([0, 1000])
    setSelectedBrands([])
    setSortBy("featured")
  }

  const addToCart = (item: Product): void => {
    Alert.alert("Added to Cart", `${item.name} has been added to your cart!`)
  }

  const renderProduct = ({ item }: { item: Product }): JSX.Element => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Card containerStyle={styles.productCardContainer}>
        <View style={styles.productImage}>
          <Avatar size={100} source={{ uri: item.image }} />
          {item.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.wishlistButton}>
            <Icon name="heart-outline" type="ionicon" size={20} color="#E91E63" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName} numberOfLines={2}>
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
        <Button
          title="Add to Cart"
          buttonStyle={styles.addToCartButton}
          titleStyle={styles.addToCartText}
          onPress={() => addToCart(item)}
        />
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.header}>
        <SearchBar
          placeholder="Search products..."
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
          inputStyle={styles.searchText}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Icon name="options" type="ionicon" size={20} color="#E91E63" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: string) => item}
          renderItem={({ item }: { item: string }) => (
            <TouchableOpacity
              style={[styles.categoryChip, selectedCategory === item && styles.selectedCategoryChip]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.categoryChipText, selectedCategory === item && styles.selectedCategoryChipText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>{filteredProducts.length} products found</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by: {sortBy}</Text>
          <Icon name="chevron-down" type="ionicon" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item: Product) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Overlay */}
      <Overlay
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        overlayStyle={styles.filterOverlay}
      >
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Icon name="close" type="ionicon" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Brands</Text>
          {brands.map((brand: string) => (
            <CheckBox
              key={brand}
              title={brand}
              checked={selectedBrands.includes(brand)}
              onPress={() => toggleBrand(brand)}
              containerStyle={styles.checkboxContainer}
            />
          ))}
        </View>

        <View style={styles.filterButtons}>
          <Button title="Clear All" type="outline" onPress={clearFilters} buttonStyle={styles.clearButton} />
          <Button title="Apply Filters" onPress={() => setShowFilters(false)} buttonStyle={styles.applyButton} />
        </View>
      </Overlay>
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
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    height: 40,
  },
  searchText: {
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
  },
  categoriesContainer: {
    backgroundColor: "white",
    paddingVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  selectedCategoryChip: {
    backgroundColor: "#E91E63",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryChipText: {
    color: "white",
    fontWeight: "600",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
  },
  productCardContainer: {
    margin: 0,
    padding: 10,
  },
  productImage: {
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
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
  wishlistButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
    height: 35,
  },
  brandName: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
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
    marginBottom: 10,
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
  addToCartButton: {
    backgroundColor: "#E91E63",
    borderRadius: 6,
    height: 35,
  },
  addToCartText: {
    fontSize: 12,
  },
  filterOverlay: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 16,
    padding: 20,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 5,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 10,
  },
  clearButton: {
    flex: 1,
    borderColor: "#E91E63",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#E91E63",
  },
})
