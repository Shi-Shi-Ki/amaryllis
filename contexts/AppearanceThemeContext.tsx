"use client"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"
import { themeType, ThemeType } from "@/utils/CommonTypes"

interface Theme {
  name: themeType
  setName: Dispatch<SetStateAction<string>>
}
interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<Theme>({
  name: ThemeType.LIGHT,
  setName: () => {},
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [name, setName] = useState<string>(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") ?? ThemeType.LIGHT
      : ThemeType.LIGHT
  )
  useEffect(() => {
    localStorage.setItem("theme", name ?? "")
  }, [name])
  return <ThemeContext.Provider value={{ name, setName }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
