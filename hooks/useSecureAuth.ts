"use client"

import { useState, useEffect, useCallback } from "react"
import SecureAuthManager from "../utils/secureAuth"
import type { AuthState, AuthMethod, UserData, AuthTokens } from "../types"

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  })

  const authManager: SecureAuthManager = SecureAuthManager.getInstance()

  // Check authentication status
  const checkAuthStatus = useCallback(async (): Promise<void> => {
    try {
      setAuthState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }))

      const isValid: boolean = await authManager.isTokenValid()

      if (isValid) {
        const userData: UserData | null = await authManager.getUserData()
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: userData,
          error: null,
        })
      } else {
        // Try to refresh token
        const refreshedTokens: AuthTokens | null = await authManager.refreshAccessToken()

        if (refreshedTokens) {
          const userData: UserData | null = await authManager.getUserData()
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: userData,
            error: null,
          })
        } else {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null,
          })
        }
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: error instanceof Error ? error.message : "Authentication error",
      })
    }
  }, [authManager])

  // Login with secure token storage
  const login = useCallback(
    async (method: AuthMethod, data?: any): Promise<boolean> => {
      try {
        setAuthState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }))

        // Mock authentication - replace with real API calls
        const mockTokens: AuthTokens = {
          accessToken: `secure_${method}_token_${Date.now()}`,
          refreshToken: `refresh_${method}_token_${Date.now()}`,
          expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
          tokenType: "Bearer",
        }

        const mockUser: UserData = {
          id: `user_${Date.now()}`,
          email: method === "phone" ? undefined : `user@${method}.com`,
          phone: method === "phone" ? data?.phoneNumber : undefined,
          name: "John Doe",
        }

        await authManager.storeTokens(mockTokens)
        await authManager.storeUserData(mockUser)

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: mockUser,
          error: null,
        })

        return true
      } catch (error) {
        console.error("Login error:", error)
        setAuthState((prev: AuthState) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Login failed",
        }))
        return false
      }
    },
    [authManager],
  )

  // Secure logout
  const logout = useCallback(async (): Promise<void> => {
    try {
      setAuthState((prev: AuthState) => ({ ...prev, isLoading: true }))
      await authManager.logout()
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if secure deletion fails
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      })
    }
  }, [authManager])

  // Enable biometric authentication
  const enableBiometric = useCallback(async (): Promise<boolean> => {
    try {
      const isAvailable: boolean = await authManager.isBiometricAvailable()
      if (!isAvailable) {
        throw new Error("Biometric authentication is not available on this device")
      }

      const authenticated: boolean = await authManager.authenticateWithBiometrics()
      if (authenticated) {
        await authManager.setBiometricEnabled(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Biometric enable error:", error)
      throw error
    }
  }, [authManager])

  // Get secure API headers
  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    try {
      return await authManager.getAuthHeaders()
    } catch (error) {
      console.error("Get headers error:", error)
      // Token might be expired, try to refresh
      await checkAuthStatus()
      throw error
    }
  }, [authManager, checkAuthStatus])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return {
    ...authState,
    login,
    logout,
    enableBiometric,
    getAuthHeaders,
    refreshAuth: checkAuthStatus,
  }
}
