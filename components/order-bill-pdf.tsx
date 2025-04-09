"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #EEEEEE",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    fontSize: 12,
  },
  separator: {
    borderBottom: "1 solid #EEEEEE",
    marginVertical: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    borderTop: "1 solid #EEEEEE",
    paddingTop: 10,
    fontSize: 10,
    color: "#666666",
    textAlign: "center",
  },
})

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

// Format date
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return dateString || "Unknown date"
  }
}

// PDF Document Component
const OrderBillPDF = ({ order }: { order: any }) => {
  // Handle missing or invalid order data
  if (!order || typeof order !== "object") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>KL-Eats</Text>
            <Text style={styles.subtitle}>Order Receipt</Text>
          </View>
          <View style={styles.section}>
            <Text>No order data available</Text>
          </View>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>KL-Eats</Text>
          <Text style={styles.subtitle}>Order Receipt</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.row}>
            <Text>Order ID:</Text>
            <Text>{order.id || "Unknown"}</Text>
          </View>
          <View style={styles.row}>
            <Text>Date:</Text>
            <Text>{formatDate(order.date || "")}</Text>
          </View>
          <View style={styles.row}>
            <Text>Collection Token:</Text>
            <Text>{order.id ? order.id.replace("ORD", "") : "Unknown"}</Text>
          </View>
          {order.canteen && (
            <View style={styles.row}>
              <Text>Canteen:</Text>
              <Text>{order.canteen}</Text>
            </View>
          )}
        </View>

        {order.deliveryAddress && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Text>{order.deliveryAddress}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item: any, index: number) => (
              <View key={index} style={styles.row}>
                <Text>
                  {item.name} x {item.quantity}
                </Text>
                <Text>{formatPrice(item.price * item.quantity)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <Text>No items available</Text>
              <Text>₹0</Text>
            </View>
          )}

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>{formatPrice((order.total || 0) - (order.deliveryFee || 40))}</Text>
          </View>
          <View style={styles.row}>
            <Text>Delivery Fee</Text>
            <Text>{formatPrice(order.deliveryFee || 40)}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.bold}>Total</Text>
            <Text style={styles.bold}>{formatPrice(order.total || 0)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for ordering with KL-Eats!</Text>
          <Text>For any queries, please contact us at support@kl-eats.com</Text>
        </View>
      </Page>
    </Document>
  )
}

export default OrderBillPDF
