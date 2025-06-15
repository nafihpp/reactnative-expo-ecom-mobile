import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Text, Card, Button, Avatar, ListItem } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import { useSecureAuth } from "../hooks/useSecureAuth"

export default function ProfileScreen() {
  const { logout, user } = useSecureAuth()

  const menuItems = [
    { id: 1, title: "Account Settings", icon: "person-outline", color: "#007AFF" },
    { id: 2, title: "Notifications", icon: "notifications-outline", color: "#FF9500" },
    { id: 3, title: "Privacy & Security", icon: "shield-outline", color: "#34C759" },
    { id: 4, title: "Help & Support", icon: "help-circle-outline", color: "#5856D6" },
    { id: 5, title: "About Shekit", icon: "information-circle-outline", color: "#8E8E93" },
  ]

  const stats = [
    { label: "Tasks Completed", value: "127", icon: "checkmark-circle", color: "#34C759" },
    { label: "Days Active", value: "45", icon: "calendar", color: "#007AFF" },
    { label: "Productivity Score", value: "85%", icon: "trending-up", color: "#FF9500" },
  ]

  const handleLogout = () => {
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

  const handleMenuPress = (item: any) => {
    Alert.alert(item.title, `${item.title} feature will be implemented`)
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
            onPress={() => Alert.alert("Edit Avatar", "Avatar editing will be implemented")}
          />
        </View>
        <Text style={styles.userName}>{user?.name || "User"}</Text>
        <Text style={styles.userEmail}>{user?.email || user?.phone || "user@shekit.com"}</Text>
      </Card>

      <Card containerStyle={styles.statsCard}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
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
        {menuItems.map((item) => (
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
        <Text style={styles.versionText}>Shekit v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2024 Shekit. All rights reserved.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
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
    backgroundColor: "#007AFF",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007AFF",
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
    borderBottomColor: "#F2F2F7",
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
