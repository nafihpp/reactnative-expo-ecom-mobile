"use client"

import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Button, Avatar, ListItem } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useSecureAuth } from "../../hooks/useSecureAuth"
import type { MenuItem, Stat, NavigationProps } from "../../types"

export default function ProfileHomeScreen({ navigation }: NavigationProps): JSX.Element {
  const { logout, user } = useSecureAuth()

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Account Settings",
      icon: "person-outline",
      color: "#E91E63",
      screen: "AccountSettings",
    },
    {
      id: 2,
      title: "Delivery Addresses",
      icon: "location-outline",
      color: "#2196F3",
      screen: "Address",
    },
    {
      id: 3,
      title: "Order History",
      icon: "receipt-outline",
      color: "#FF9800",
      screen: "Orders",
    },
    {
      id: 4,
      title: "Wishlist",
      icon: "heart-outline",
      color: "#FF5722",
      screen: "Wishlist",
    },
    {
      id: 5,
      title: "Notifications",
      icon: "notifications-outline",
      color: "#9C27B0",
      screen: "NotificationSettings",
    },
    {
      id: 6,
      title: "Help & Support",
      icon: "help-circle-outline",
      color: "#4CAF50",
      screen: "HelpSupport",
    },
    {
      id: 7,
      title: "About ShopEase",
      icon: "information-circle-outline",
      color: "#607D8B",
      screen: "About",
    },
  ]

  const stats: Stat[] = [
    { label: "Orders Placed", value: "24", icon: "bag", color: "#E91E63" },
    { label: "Items Purchased", value: "127", icon: "cube", color: "#2196F3" },
    { label: "Money Saved", value: "$340", icon: "trending-down", color: "#4CAF50" },
  ]

  const handleLogout = (): void => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout()
          } catch (error) {
            Alert.alert("Error", "Failed to sign out. Please try again.")
          }
        },
      },
    ])
  }

  const handleMenuPress = (item: MenuItem): void => {
    if (item.screen === "Orders" || item.screen === "Wishlist") {
      // Navigate to main stack screens
      navigation.navigate("MainTabs", { screen: "Home" })
      navigation.navigate(item.screen)
    } else {
      // Navigate within profile stack
      navigation.navigate(item.screen)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar
            size={80}
            rounded
            source={{ uri: "/placeholder.svg?height=80&width=80" }}
            title={user?.name?.charAt(0) || "U"}
            containerStyle={styles.avatar}
          />
          <Button
            icon={<Icon name="camera" type="ionicon" size={16} color="white" />}
            buttonStyle={styles.editAvatarButton}
            onPress={() => navigation.navigate("AccountSettings")}
          />
        </View>
        <Text style={styles.userName}>{user?.name || "User"}</Text>
        <Text style={styles.userEmail}>{user?.email || user?.phone || "user@shopease.com"}</Text>
      </Card>

      <Card containerStyle={styles.statsCard}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat: Stat, index: number) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon} type="ionicon" size={24} color={stat.color} containerStyle={styles.statIcon} />
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card containerStyle={styles.menuCard}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {menuItems.map((item: MenuItem) => (
          <ListItem key={item.id} onPress={() => handleMenuPress(item)} containerStyle={styles.menuItem}>
            <Icon name={item.icon} type="ionicon" size={20} color={item.color} containerStyle={styles.menuIcon} />
            <ListItem.Content>
              <ListItem.Title style={styles.menuTitle}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </Card>

      <Card containerStyle={styles.actionCard}>
        <Button
          title="Sign Out"
          icon={<Icon name="log-out-outline" type="ionicon" size={20} color="#FF3B30" />}
          type="outline"
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutText}
          onPress={handleLogout}
        />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.versionText}>ShopEase v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2024 ShopEase. All rights reserved.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileCard: {
    margin: 15,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 30,
  },
  profileHeader: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: "#E91E63",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E91E63",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  statsCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  menuCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 0,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    color: "#333",
  },
  actionCard: {
    margin: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  logoutButton: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  logoutText: {
    color: "#FF3B30",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: "#8E8E93",
  },
})
