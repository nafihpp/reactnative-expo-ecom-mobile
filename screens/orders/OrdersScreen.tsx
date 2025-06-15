"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Text, Card, Button, Avatar, Badge } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Order, NavigationProps } from "../../types"

interface Tab {
  key: string
  label: string
}

export default function OrdersScreen({ navigation }: NavigationProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>("all")

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 1388,
      items: [
        {
          id: "1",
          name: "iPhone 15 Pro Max",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 1199,
        },
        {
          id: "2",
          name: "Nike Air Jordan",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 189,
        },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 299,
      items: [
        {
          id: "3",
          name: "Designer Handbag",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 299,
        },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-01-22",
      status: "confirmed",
      total: 899,
      items: [
        {
          id: "4",
          name: "Samsung Galaxy S24",
          image: "/placeholder.svg?height=60&width=60",
          quantity: 1,
          price: 899,
        },
      ],
    },
  ]

  const tabs: Tab[] = [
    { key: "all", label: "All Orders" },
    { key: "pending", label: "Pending" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ]

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "#FF9800"
      case "confirmed":
        return "#2196F3"
      case "shipped":
        return "#9C27B0"
      case "delivered":
        return "#4CAF50"
      case "cancelled":
        return "#F44336"
      default:
        return "#666"
    }
  }

  const getStatusText = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const filteredOrders: Order[] =
    selectedTab === "all" ? orders : orders.filter((order: Order) => order.status === selectedTab)

  const handleReorder = (orderId: string): void => {
    console.log("Reorder:", orderId)
  }

  const handleTrackOrder = (order: Order): void => {
    navigation.navigate("OrderTracking", { order })
  }

  const renderOrder = ({ item }: { item: Order }): JSX.Element => (
    <Card containerStyle={styles.orderCard}>
      <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", { order: item })}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
            <Text style={styles.orderDate}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
          <Badge
            value={getStatusText(item.status)}
            badgeStyle={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
            textStyle={styles.statusText}
          />
        </View>

        <View style={styles.orderItems}>
          {item.items.slice(0, 2).map((orderItem, index: number) => (
            <View key={orderItem.id} style={styles.orderItem}>
              <Avatar size={50} source={{ uri: orderItem.image }} containerStyle={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {orderItem.name}
                </Text>
                <Text style={styles.itemDetails}>
                  Qty: {orderItem.quantity} • ${orderItem.price}
                </Text>
              </View>
            </View>
          ))}
          {item.items.length > 2 && <Text style={styles.moreItems}>+{item.items.length - 2} more items</Text>}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: ${item.total}</Text>
          <View style={styles.orderActions}>
            {item.status === "delivered" && (
              <Button
                title="Reorder"
                type="outline"
                buttonStyle={styles.reorderButton}
                titleStyle={styles.reorderText}
                onPress={() => handleReorder(item.id)}
              />
            )}
            {(item.status === "shipped" || item.status === "confirmed") && (
              <Button
                title="Track"
                buttonStyle={styles.trackButton}
                titleStyle={styles.trackText}
                onPress={() => handleTrackOrder(item)}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  )

  if (filteredOrders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="receipt-outline" type="ionicon" size={80} color="#CCC" />
        <Text style={styles.emptyTitle}>No orders found</Text>
        <Text style={styles.emptySubtitle}>
          {selectedTab === "all" ? "You haven't placed any orders yet" : `No ${selectedTab} orders`}
        </Text>
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
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab: Tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Text style={[styles.tabText, selectedTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item: Order) => item.id}
        contentContainerStyle={styles.ordersList}
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
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#E91E63",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#E91E63",
    fontWeight: "600",
  },
  ordersList: {
    padding: 15,
  },
  orderCard: {
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  orderItems: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    borderRadius: 6,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 12,
    color: "#666",
  },
  moreItems: {
    fontSize: 12,
    color: "#E91E63",
    fontStyle: "italic",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderActions: {
    flexDirection: "row",
    gap: 10,
  },
  reorderButton: {
    borderColor: "#E91E63",
    paddingHorizontal: 15,
    height: 35,
  },
  reorderText: {
    color: "#E91E63",
    fontSize: 12,
  },
  trackButton: {
    backgroundColor: "#E91E63",
    paddingHorizontal: 15,
    height: 35,
  },
  trackText: {
    fontSize: 12,
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
