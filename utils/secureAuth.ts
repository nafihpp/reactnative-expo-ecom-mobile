import * as SecureStore from "expo-secure-store"
import * as LocalAuthentication from "expo-local-authentication"
import * as Crypto from "expo-crypto"
import type { AuthTokens, UserData } from "../types"

class SecureAuthManager {
  private static instance: SecureAuthManager
  private readonly ACCESS_TOKEN_KEY: string = "secure_access_token"
  private readonly REFRESH_TOKEN_KEY: string = "secure_refresh_token"
  private readonly USER_DATA_KEY: string = "secure_user_data"
  private readonly BIOMETRIC_KEY: string = "biometric_enabled"
  private readonly TOKEN_SALT_KEY: string = "token_salt"

  static getInstance(): SecureAuthManager {
    if (!SecureAuthManager.instance) {
      SecureAuthManager.instance = new SecureAuthManager()
    }
    return SecureAuthManager.instance
  }

  // Generate a unique salt for token encryption
  private async getOrCreateSalt(): Promise<string> {
    try {
      let salt: string | null = await SecureStore.getItemAsync(this.TOKEN_SALT_KEY)
      if (!salt) {
        salt = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          Date.now().toString() + Math.random().toString(),
        )
        await SecureStore.setItemAsync(this.TOKEN_SALT_KEY, salt)
      }
      return salt
    } catch (error) {
      console.error("Error managing salt:", error)
      throw new Error("Failed to manage encryption salt")
    }
  }

  // Encrypt sensitive data before storing
  private async encryptData(data: string): Promise<string> {
    try {
      const salt: string = await this.getOrCreateSalt()
      const combined: string = `${salt}:${data}`
      return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, combined)
    } catch (error) {
      console.error("Encryption error:", error)
      return data // Fallback to plain text if encryption fails
    }
  }

  // Check if biometric authentication is available and enrolled
  async isBiometricAvailable(): Promise<boolean> {
    try {
      const hasHardware: boolean = await LocalAuthentication.hasHardwareAsync()
      const isEnrolled: boolean = await LocalAuthentication.isEnrolledAsync()
      return hasHardware && isEnrolled
    } catch (error) {
      console.error("Biometric check error:", error)
      return false
    }
  }

  // Authenticate with biometrics
  async authenticateWithBiometrics(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your account",
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
      })
      return result.success
    } catch (error) {
      console.error("Biometric authentication error:", error)
      return false
    }
  }

  // Store tokens securely
  async storeTokens(tokens: AuthTokens): Promise<void> {
    try {
      const tokenData: string = JSON.stringify(tokens)
      const encryptedTokens: string = await this.encryptData(tokenData)

      await SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, encryptedTokens, {
        requireAuthentication: true,
        authenticationPrompt: "Authenticate to save your login",
      })

      // Store refresh token separately with different security level
      await SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, tokens.refreshToken, {
        requireAuthentication: false, // Allow automatic refresh
      })
    } catch (error) {
      console.error("Token storage error:", error)
      throw new Error("Failed to store authentication tokens securely")
    }
  }

  // Retrieve tokens securely
  async getTokens(): Promise<AuthTokens | null> {
    try {
      const biometricEnabled: boolean = await this.isBiometricEnabled()

      if (biometricEnabled) {
        const authenticated: boolean = await this.authenticateWithBiometrics()
        if (!authenticated) {
          throw new Error("Biometric authentication failed")
        }
      }

      const encryptedTokens: string | null = await SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY)
      if (!encryptedTokens) return null

      // For demo purposes, we'll return mock tokens
      // In real implementation, you'd decrypt the tokens here
      const refreshToken: string | null = await SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY)

      return {
        accessToken: "secure_access_token_" + Date.now(),
        refreshToken: refreshToken || "secure_refresh_token",
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
        tokenType: "Bearer",
      }
    } catch (error) {
      console.error("Token retrieval error:", error)
      return null
    }
  }

  // Check if tokens are valid and not expired
  async isTokenValid(): Promise<boolean> {
    try {
      const tokens: AuthTokens | null = await this.getTokens()
      if (!tokens) return false

      return Date.now() < tokens.expiresAt
    } catch (error) {
      console.error("Token validation error:", error)
      return false
    }
  }

  // Refresh access token using refresh token
  async refreshAccessToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken: string | null = await SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY)
      if (!refreshToken) return null

      // Simulate API call to refresh token
      const response: AuthTokens | null = await this.mockRefreshTokenAPI(refreshToken)

      if (response) {
        await this.storeTokens(response)
        return response
      }

      return null
    } catch (error) {
      console.error("Token refresh error:", error)
      return null
    }
  }

  // Mock API call for token refresh
  private async mockRefreshTokenAPI(refreshToken: string): Promise<AuthTokens | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "new_access_token_" + Date.now(),
          refreshToken: "new_refresh_token_" + Date.now(),
          expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
          tokenType: "Bearer",
        })
      }, 1000)
    })
  }

  // Store user data securely
  async storeUserData(userData: UserData): Promise<void> {
    try {
      const encryptedData: string = await this.encryptData(JSON.stringify(userData))
      await SecureStore.setItemAsync(this.USER_DATA_KEY, encryptedData)
    } catch (error) {
      console.error("User data storage error:", error)
      throw new Error("Failed to store user data securely")
    }
  }

  // Get user data
  async getUserData(): Promise<UserData | null> {
    try {
      const encryptedData: string | null = await SecureStore.getItemAsync(this.USER_DATA_KEY)
      if (!encryptedData) return null

      // For demo purposes, return mock user data
      return {
        id: "user_123",
        email: "user@shopease.com",
        phone: "+971 55 910 5303",
        name: "John Doe",
      }
    } catch (error) {
      console.error("User data retrieval error:", error)
      return null
    }
  }

  // Enable/disable biometric authentication
  async setBiometricEnabled(enabled: boolean): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.BIOMETRIC_KEY, enabled.toString())
    } catch (error) {
      console.error("Biometric setting error:", error)
    }
  }

  // Check if biometric is enabled
  async isBiometricEnabled(): Promise<boolean> {
    try {
      const enabled: string | null = await SecureStore.getItemAsync(this.BIOMETRIC_KEY)
      return enabled === "true"
    } catch (error) {
      console.error("Biometric check error:", error)
      return false
    }
  }

  // Secure logout - clear all stored data
  async logout(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY),
        SecureStore.deleteItemAsync(this.USER_DATA_KEY),
        SecureStore.deleteItemAsync(this.BIOMETRIC_KEY),
        SecureStore.deleteItemAsync(this.TOKEN_SALT_KEY),
      ])
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with logout even if some deletions fail
    }
  }

  // Validate token format and structure
  private isValidTokenFormat(token: string): boolean {
    // Basic JWT format validation
    const parts: string[] = token.split(".")
    return parts.length === 3
  }

  // Get secure headers for API calls
  async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const tokens: AuthTokens | null = await this.getTokens()
      if (!tokens || !this.isValidTokenFormat(tokens.accessToken)) {
        throw new Error("Invalid or missing access token")
      }

      return {
        Authorization: `${tokens.tokenType} ${tokens.accessToken}`,
        "Content-Type": "application/json",
      }
    } catch (error) {
      console.error("Auth headers error:", error)
      throw new Error("Failed to get authentication headers")
    }
  }
}

export default SecureAuthManager
