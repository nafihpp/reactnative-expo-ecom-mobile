"use client"

import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Card, Avatar } from "@rneui/themed"
import { Icon } from "@rneui/themed"
import type { Order, NavigationProps } from "../../types"

interface OrderTrackingScreenProps extends NavigationProps {
  route: {
    params: {
      order: Order
    }
  }
}

interface TrackingStep {
  id: string
  title: string
  description: string
  timestamp: string
  completed: boolean
  current: boolean
}

export default function OrderTrackingScreen({ navigation, route }: OrderTrackingScreenProps): JSX.Element {
  const { order } = route.params

  const getTrackingSteps = (status: string): TrackingStep[] => {
    const baseSteps: TrackingStep[] = [
      {
        id: "1",
        title: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared",
        timestamp: "Jan 22, 2024 - 10:30 AM",
        completed: true,
        current: false,
      },
      {
        id: "2",
        title: "Order Packed",
        description: "Your order has been packed and ready for shipment",
        timestamp: "Jan 22, 2024 - 2:15 PM",
        completed: status !== "confirmed",
        current: status === "confirmed",
      },
      {
        id: "3",
        title: "Order Shipped",
        description: "Your order is on the way to your delivery address",
        timestamp: status === "shipped" || status === "delivered" ? "Jan 23, 2024 - 9:00 AM" : "",
        completed: status === "delivered",
        current: status === "shipped",
      },
      {
        id: "4",
        title: "Out for Delivery",
        description: "Your order is out for delivery and will arrive soon",
        timestamp: status === "delivered" ? "Jan 24, 2024 - 11:30 AM" : "",
        completed: status === "delivered",
        current: false,
      },
      {
        id: "5",
        title: "Delivered",
        description: "Your order has been delivered successfully",
        timestamp: status === "delivered" ? "Jan 24, 2024 - 3:45 PM" : "",
        completed: status === "delivered",
        current: false,
      },
    ]

    return baseSteps
  }

  const trackingSteps = getTrackingSteps(order.status)
  const currentStep = trackingSteps.find((step) => step.current)
  const estimatedDelivery = "Jan 25, 2024"

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "#2196F3"
      case "shipped":
        return "#9C27B0"
      case "delivered":
        return "#4CAF50"
      default:
        return "#666"
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Header */}
      <Card containerStyle={styles.headerCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            <Text style={styles.orderDate}>Placed on {new Date(order.date).toLocaleDateString()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
          </View>
        </View>

        {order.status !== "delivered" && (
          <View style={styles.estimatedDelivery}>
            <Icon name="time-outline" type="ionicon" size={16} color="#666" />
            <Text style={styles.estimatedText}>Estimated delivery: {estimatedDelivery}</Text>
          </View>
        )}
      </Card>

      {/* Current Status */}
      {currentStep && (
        <Card containerStyle={styles.currentStatusCard}>
          <View style={styles.currentStatusHeader}>
            <Icon name="location" type="ionicon" size={24} color="#E91E63" />
            <Text style={styles.currentStatusTitle}>Current Status</Text>
          </View>
          <Text style={styles.currentStatusDescription}>{currentStep.title}</Text>
          <Text style={styles.currentStatusSubtext}>{currentStep.description}</Text>
          {currentStep.timestamp && <Text style={styles.currentStatusTime}>{currentStep.timestamp}</Text>}
        </Card>
      )}

      {/* Tracking Timeline */}
      <Card containerStyle={styles.timelineCard}>
        <Text style={styles.sectionTitle}>Order Timeline</Text>
        <View style={styles.timeline}>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineIcon,
                    step.completed
                      ? styles.timelineIconCompleted
                      : step.current
                        ? styles.timelineIconCurrent
                        : styles.timelineIconPending,
                  ]}
                >
                  {step.completed ? (
                    <Icon name="checkmark" type="ionicon" size={16} color="white" />
                  ) : (
                    <View style={styles.timelineIconDot} />
                  )}
                </View>
                {index < trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.completed ? styles.timelineLineCompleted : styles.timelineLinePending,
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, step.current && styles.timelineTitleCurrent]}>{step.title}</Text>
                <Text style={styles.timelineDescription}>{step.description}</Text>
                {step.timestamp && <Text style={styles.timelineTimestamp}>{step.timestamp}</Text>}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Order Items */}
      <Card containerStyle={styles.itemsCard}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Avatar size={60} source={{ uri: item.image }} containerStyle={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                Quantity: {item.quantity} • ${item.price}
              </Text>
            </View>
            <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>Total: ${order.total}</Text>
        </View>
      </Card>

      {/* Delivery Address */}
      {order.deliveryAddress && (
        <Card containerStyle={styles.addressCard}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressInfo}>
            <Icon name="location-outline" type="ionicon" size={20} color="#666" />
            <View style={styles.addressText}>
              <Text style={styles.addressName}>{order.deliveryAddress.name}</Text>
              <Text style={styles.addressDetails}>{order.deliveryAddress.street}</Text>
              <Text style={styles.addressDetails}>
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
              </Text>
            </View>
          </View>
        </Card>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  estimatedDelivery: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 8,
  },
  estimatedText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  currentStatusCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF8F8",
    borderColor: "#E91E63",
    borderWidth: 1,
  },
  currentStatusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  currentStatusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E91E63",
    marginLeft: 8,
  },
  currentStatusDescription: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  currentStatusSubtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  currentStatusTime: {
    fontSize: 12,
    color: "#999",
  },
  timelineCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  timeline: {
    paddingLeft: 10,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 15,
  },
  timelineIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineIconCompleted: {
    backgroundColor: "#4CAF50",
  },
  timelineIconCurrent: {
    backgroundColor: "#E91E63",
  },
  timelineIconPending: {
    backgroundColor: "#E5E5E5",
  },
  timelineIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
  },
  timelineLine: {
    width: 2,
    height: 30,
    marginTop: 5,
  },
  timelineLineCompleted: {
    backgroundColor: "#4CAF50",
  },
  timelineLinePending: {
    backgroundColor: "#E5E5E5",
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  timelineTitleCurrent: {
    color: "#E91E63",
  },
  timelineDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: "#999",
  },
  itemsCard: {
    margin: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  itemImage: {
    borderRadius: 6,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
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
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E91E63",
  },
  orderTotal: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  addressCard: {
    margin: 15,
    marginVertical: 8,
    marginBottom: 20,
    borderRadius: 12,
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressText: {
    marginLeft: 12,
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  addressDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 1,
  },
})
