"use client"

import { View, StyleSheet, ScrollView, Linking } from "react-native"
import { Text, Card, Button } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { NavigationProps } from "../../types"

export default function AboutScreen({ navigation }: NavigationProps): JSX.Element {
  const handleWebsite = (): void => {
    Linking.openURL("https://shopease.com")
  }

  const handlePrivacyPolicy = (): void => {
    Linking.openURL("https://shopease.com/privacy")
  }

  const handleTermsOfService = (): void => {
    Linking.openURL("https://shopease.com/terms")
  }

  const handleSocialMedia = (platform: string): void => {
    const urls = {
      facebook: "https://facebook.com/shopease",
      twitter: "https://twitter.com/shopease",
      instagram: "https://instagram.com/shopease",
      linkedin: "https://linkedin.com/company/shopease",
    }
    Linking.openURL(urls[platform as keyof typeof urls])
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Icon name="storefront" type="ionicon" size={60} color="#E91E63" />
          </View>
          <Text style={styles.appName}>ShopEase</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.tagline}>Your Ultimate Shopping Destination</Text>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>About ShopEase</Text>
        <Text style={styles.description}>
          ShopEase is your ultimate shopping companion, designed to help you discover amazing products, manage your
          orders, and enjoy a seamless shopping experience. Built with modern technology and user-centric design,
          ShopEase makes online shopping simple and enjoyable.
        </Text>
        <Text style={styles.description}>
          Founded in 2024, we're committed to providing the best online shopping experience with secure payments, fast
          delivery, and excellent customer service.
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.featureList}>
          <View style={styles.feature}>
            <Icon name="search" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Smart Product Discovery</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="shield-checkmark" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Secure Shopping Cart</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="location" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Real-time Order Tracking</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="heart" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Wishlist Management</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="home" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Multiple Delivery Addresses</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="finger-print" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Biometric Authentication</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="card" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Multiple Payment Options</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="notifications" type="ionicon" size={16} color="#E91E63" />
            <Text style={styles.featureText}>Smart Notifications</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialButtons}>
          <Button
            title="Facebook"
            type="outline"
            onPress={() => handleSocialMedia("facebook")}
            buttonStyle={[styles.socialButton, { borderColor: "#1877F2" }]}
            titleStyle={[styles.socialButtonText, { color: "#1877F2" }]}
            icon={<Icon name="logo-facebook" type="ionicon" size={16} color="#1877F2" />}
          />
          <Button
            title="Twitter"
            type="outline"
            onPress={() => handleSocialMedia("twitter")}
            buttonStyle={[styles.socialButton, { borderColor: "#1DA1F2" }]}
            titleStyle={[styles.socialButtonText, { color: "#1DA1F2" }]}
            icon={<Icon name="logo-twitter" type="ionicon" size={16} color="#1DA1F2" />}
          />
        </View>
        <View style={styles.socialButtons}>
          <Button
            title="Instagram"
            type="outline"
            onPress={() => handleSocialMedia("instagram")}
            buttonStyle={[styles.socialButton, { borderColor: "#E4405F" }]}
            titleStyle={[styles.socialButtonText, { color: "#E4405F" }]}
            icon={<Icon name="logo-instagram" type="ionicon" size={16} color="#E4405F" />}
          />
          <Button
            title="LinkedIn"
            type="outline"
            onPress={() => handleSocialMedia("linkedin")}
            buttonStyle={[styles.socialButton, { borderColor: "#0A66C2" }]}
            titleStyle={[styles.socialButtonText, { color: "#0A66C2" }]}
            icon={<Icon name="logo-linkedin" type="ionicon" size={16} color="#0A66C2" />}
          />
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Legal & Support</Text>
        <Button
          title="Privacy Policy"
          type="clear"
          onPress={handlePrivacyPolicy}
          titleStyle={styles.linkText}
          icon={<Icon name="shield-outline" type="ionicon" size={16} color="#E91E63" />}
        />
        <Button
          title="Terms of Service"
          type="clear"
          onPress={handleTermsOfService}
          titleStyle={styles.linkText}
          icon={<Icon name="document-text-outline" type="ionicon" size={16} color="#E91E63" />}
        />
        <Button
          title="Visit Website"
          type="clear"
          onPress={handleWebsite}
          titleStyle={styles.linkText}
          icon={<Icon name="globe-outline" type="ionicon" size={16} color="#E91E63" />}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <View style={styles.footerInfo}>
          <Text style={styles.copyright}>© 2024 ShopEase. All rights reserved.</Text>
          <Text style={styles.madeWith}>Made with ❤️ for shopping enthusiasts</Text>
          <Text style={styles.contact}>Contact: support@shopease.com</Text>
          <Text style={styles.contact}>Phone: +971-800-SHOPEASE</Text>
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
  logoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 15,
  },
  featureList: {
    gap: 12,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
  },
  socialButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
    height: 45,
  },
  socialButtonText: {
    fontSize: 14,
    marginLeft: 8,
  },
  linkText: {
    color: "#E91E63",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 8,
  },
  footerInfo: {
    alignItems: "center",
    gap: 8,
  },
  copyright: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  madeWith: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  contact: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
})
