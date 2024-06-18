"use client"
import { useTheme } from "./AppearanceThemeContext"
import { ThemeType } from "@/utils/CommonTypes"

export default function ClientThemeWrapper({ children }: any) {
  const { name, setName } = useTheme()
  return (
    <div data-theme={name}>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          value="synthwave"
          onChange={(e) => {
            setName(e.target.checked ? ThemeType.LIGHT : ThemeType.DARK)
          }}
        />
        <span className="swap-off material-icons">light_mode</span>
        <span className="swap-on material-icons">dark_mode</span>
      </label>
      {children}
    </div>
  )
}
