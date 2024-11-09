import * as CommonClasses from "@/utils/CommonClasses"
import { useTheme } from "@/contexts/ThemeChanger"
import { v7 as uuid } from "uuid"
import { ButtonColor } from "./BaseButton"

interface BaseIcon {
  iconName: string
  buttonColor?: ButtonColor
  htmlForId?: string
}

export const BaseIcon = ({ iconName, buttonColor, htmlForId }: BaseIcon): JSX.Element => {
  const { theme } = useTheme()
  let iconColor = CommonClasses.simpleThemeColorName(theme)
  if (buttonColor) {
    // ボタンと組み合わせる場合はボタンの色に合わせてアイコンの配色が自動で設定されるようにする
    iconColor = CommonClasses.buttonIconColorClass(buttonColor, theme)
  }
  if (!htmlForId) {
    htmlForId = uuid()
  }
  return (
    <span id={htmlForId} className="material-icons" style={{ color: iconColor }}>
      {iconName}
    </span>
  )
}
