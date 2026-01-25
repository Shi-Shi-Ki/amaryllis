"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react"
import Cookies from "js-cookie"
import { googleLogout } from "@react-oauth/google"
import { useRouter } from "next/navigation"

interface User {
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    //todo
    console.log("* AuthContext useEffect")
    setLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = useCallback(() => {
    setUser(null)
    // ログアウト処理（Cookieの削除など）
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    // 必要であればバックエンドのログアウトAPIを呼び出す
    // fetch('/api/auth/logout', { method: 'POST' });
    googleLogout()
    console.log("Successfully logged out")
    router.push("/signin")
  }, [setUser, router])

  // ロード中は何も表示しないか、ローディングスピナーなどを表示
  if (loading) {
    return <div>Loading...</div> // または null
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
