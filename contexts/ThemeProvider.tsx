"use client"
import { useEffect, useState, createContext, useCallback } from "react"
import { themeType, ThemeType, isIncludesType } from "@/utils/CommonTypes"
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
  selectedTheme: themeType
}) {
  const [theme, setTheme] = useState<themeType>(selectedTheme)

  const changer = useCallback((theme: themeType) => {
    console.log("[ThemeProvider] call changer.")
    setTheme(theme)
    Cookies.set("theme", theme, { secure: true })
    document.documentElement.setAttribute("data-theme", theme)
  }, [])

  useEffect(() => {
    console.log("[ThemeProvider] call useEffect.")
    const cookieTheme = Cookies.get("theme")
    if (cookieTheme && isIncludesType(ThemeType, cookieTheme)) {
      setTheme(cookieTheme)
      document.documentElement.setAttribute("data-theme", cookieTheme)
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, changer }}>{children}</ThemeContext.Provider>
}
