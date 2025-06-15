"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native"
import { Text, Card, Button, Avatar, Divider } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Product, NavigationProps } from "../types"

const { width } = Dimensions.get("window")

interface ProductDetailsScreenProps extends NavigationProps {
  route: {
    params: {
      product: Product
    }
  }
}

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

interface Specification {
  label: string
  value: string
}

export default function ProductDetailsScreen({ navigation, route }: ProductDetailsScreenProps): JSX.Element {
  const { product } = route.params
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false)

  const sizes: string[] = ["S", "M", "L", "XL"]
  const colors: string[] = ["#000000", "#FFFFFF", "#E91E63", "#2196F3"]

  const specifications: Specification[] = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Rating", value: `${product.rating}/5.0` },
    { label: "Availability", value: "In Stock" },
  ]

  const reviews: Review[] = [
    {
      id: "1",
      user: "John D.",
      rating: 5,
      comment: "Excellent product! Highly recommended.",
      date: "2024-01-15",
    },
    {
      id: "2",
      user: "Sarah M.",
      rating: 4,
      comment: "Good quality, fast delivery.",
      date: "2024-01-10",
    },
  ]

  const handleAddToCart = (): void => {
    Alert.alert("Added to Cart", `${product.name} has been added to your cart!`)
  }

  const handleBuyNow = (): void => {
    navigation.navigate("Checkout", { product, quantity })
  }

  const toggleWishlist = (): void => {
    setIsWishlisted(!isWishlisted)
    Alert.alert(
      isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist!`,
    )
  }

  const handleQuantityChange = (increment: boolean): void => {
    if (increment) {
      setQuantity((prev) => prev + 1)
    } else {
      setQuantity((prev) => Math.max(1, prev - 1))
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Avatar size={width - 40} source={{ uri: product.image }} containerStyle={styles.productImage} />
          <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
            <Icon
              name={isWishlisted ? "heart" : "heart-outline"}
              type="ionicon"
              size={24}
              color={isWishlisted ? "#E91E63" : "#666"}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <Card containerStyle={styles.infoCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star: number) => (
                <Icon
                  key={star}
                  name="star"
                  type="ionicon"
                  size={16}
                  color={star <= Math.floor(product.rating) ? "#FFD700" : "#E5E5E5"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>({product.rating}) • 127 reviews</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>
        </Card>

        {/* Product Options */}
        {product.category === "Fashion" && (
          <Card containerStyle={styles.optionsCard}>
            <Text style={styles.optionTitle}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size: string) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.optionTitle}>Color</Text>
            <View style={styles.colorContainer}>
              {colors.map((color: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorButton,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </Card>
        )}

        {/* Quantity */}
        <Card containerStyle={styles.quantityCard}>
          <Text style={styles.optionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(false)}>
              <Icon name="remove" type="ionicon" size={20} color="#E91E63" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(true)}>
              <Icon name="add" type="ionicon" size={20} color="#E91E63" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Specifications */}
        <Card containerStyle={styles.specsCard}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {specifications.map((spec: Specification, index: number) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}
        </Card>

        {/* Description */}
        <Card containerStyle={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a premium quality product designed with attention to detail and crafted using the finest materials.
            Perfect for everyday use and special occasions. Features include durability, comfort, and style that meets
            modern standards.
          </Text>
        </Card>

        {/* Reviews */}
        <Card containerStyle={styles.reviewsCard}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Button title="View All" type="clear" titleStyle={styles.viewAllText} />
          </View>
          {reviews.map((review: Review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Icon
                      key={star}
                      name="star"
                      type="ionicon"
                      size={12}
                      color={star <= review.rating ? "#FFD700" : "#E5E5E5"}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
              {review.id !== reviews[reviews.length - 1].id && <Divider style={styles.reviewDivider} />}
            </View>
          ))}
        </Card>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          title="Add to Cart"
          type="outline"
          buttonStyle={styles.addToCartButton}
          titleStyle={styles.addToCartText}
          onPress={handleAddToCart}
        />
        <Button title="Buy Now" buttonStyle={styles.buyNowButton} onPress={handleBuyNow} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    borderRadius: 12,
  },
  wishlistButton: {
    position: "absolute",
    top: 30,
    right: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  brandName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E91E63",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  optionsCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedSizeButton: {
    borderColor: "#E91E63",
    backgroundColor: "#E91E63",
  },
  sizeText: {
    fontSize: 14,
    color: "#666",
  },
  selectedSizeText: {
    color: "white",
    fontWeight: "600",
  },
  colorContainer: {
    flexDirection: "row",
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColorButton: {
    borderColor: "#E91E63",
  },
  quantityCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 20,
  },
  specsCard: {
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
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  specLabel: {
    fontSize: 14,
    color: "#666",
  },
  specValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  descriptionCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  reviewsCard: {
    margin: 15,
    marginVertical: 5,
    marginBottom: 100,
    borderRadius: 12,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  viewAllText: {
    color: "#E91E63",
    fontSize: 14,
  },
  reviewItem: {
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  reviewStars: {
    flexDirection: "row",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  reviewDivider: {
    marginTop: 15,
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    gap: 10,
  },
  addToCartButton: {
    flex: 1,
    borderColor: "#E91E63",
    height: 50,
  },
  addToCartText: {
    color: "#E91E63",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#E91E63",
    height: 50,
  },
})
