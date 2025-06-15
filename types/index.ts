export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  category: string
  brand: string
  inStock?: boolean
  description?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  deliveryAddress?: Address
}

export interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

export interface WishlistItem extends Product {
  inStock: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
  tokenType: string
}

export interface UserData {
  id: string
  email?: string
  phone?: string
  name?: string
  defaultAddressId?: string
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
  instructions?: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserData | null
  error: string | null
}

export type AuthMethod = "phone" | "apple" | "google"

export type NavigationProps = {
  navigation: any
  route?: any
}

export interface Deal {
  id: string
  title: string
  subtitle: string
  color: string
}

export interface QuickAction {
  id: string
  title: string
  icon: string
  color: string
  onPress: () => void
}

export interface MenuItem {
  id: number
  title: string
  icon: string
  color: string
  screen: string
}

export interface Stat {
  label: string
  value: string
  icon: string
  color: string
}
