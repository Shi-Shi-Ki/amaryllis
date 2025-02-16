"use client"
import { useEffect, useState, createContext, useCallback } from "react"
import { themeType, ThemeType } from "@/utils/CommonTypes"
import Cookies from "js-cookie"

interface Theme {
  theme: themeType
  changer: (theme: themeType) => void
}

export const ThemeContext = createContext<Theme>({
  theme: ThemeType.DARK,
  changer: () => {},
})

export default function ThemeProvider({
  children,
  selectedTheme,
}: {
  children: React.ReactNode
  selectedTheme: string
}) {
  const [theme, setTheme] = useState<themeType>(
    selectedTheme === "light" ? ThemeType.LIGHT : ThemeType.DARK
  )
  const changer = useCallback((theme: themeType) => {
    console.log("useCallback theme", theme)
    const newTheme = theme === ThemeType.LIGHT ? ThemeType.LIGHT : ThemeType.DARK
    console.log("useCallback newTheme", newTheme)
    setTheme(newTheme)
    Cookies.set("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [])

  useEffect(() => {
    const cookieTheme = Cookies.get("theme")
    console.log("useEffect cookieTheme", cookieTheme)
    if (cookieTheme) {
      console.log("get cookieTheme", cookieTheme)
      const initialTheme =
        cookieTheme === ThemeType.LIGHT.toString() ? ThemeType.LIGHT : ThemeType.DARK
      setTheme(initialTheme)
      document.documentElement.setAttribute("data-theme", initialTheme)
    } else {
      console.log("no set cookieTheme", theme)
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, changer }}>{children}</ThemeContext.Provider>
}
