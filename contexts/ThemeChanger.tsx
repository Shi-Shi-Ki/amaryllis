"use client"
import { Dispatch, SetStateAction, useEffect, useState, createContext, useContext } from "react"
import { themeType, ThemeType } from "@/utils/CommonTypes"
import { match } from "ts-pattern"

interface Theme {
  theme: themeType
  setTheme: Dispatch<SetStateAction<themeType>>
}
const ThemeContext = createContext<Theme>({
  theme: ThemeType.LIGHT,
  setTheme: () => {},
})

//export default function ThemeChanger({ children }: { children: React.ReactNode }) {
export default function ThemeChanger() {
  const [theme, setTheme] = useState<themeType>(ThemeType.LIGHT)

  const handleToggle = (e: { target: { checked: boolean } }) => {
    if (e.target.checked) {
      setTheme(ThemeType.DARK)
    } else {
      setTheme(ThemeType.LIGHT)
    }
  }

  useEffect(() => {
    const localTheme = match(localStorage.getItem("theme"))
      .with(ThemeType.LIGHT, () => ThemeType.LIGHT)
      .with(ThemeType.DARK, () => ThemeType.DARK)
      .otherwise(() => {
        console.error(`set theme error... (localTheme: ${localTheme})`)
        return ThemeType.NONE
      })
    setTheme(localTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <label className="swap swap-rotate">
        <input type="checkbox" onChange={handleToggle} />
        <span className="swap-off material-icons">light_mode</span>
        <span className="swap-on material-icons">dark_mode</span>
      </label>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
