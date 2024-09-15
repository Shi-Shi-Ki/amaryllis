import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { useTheme } from "@/contexts/ThemeChanger"
import { v7 as uuid } from "uuid"

export const BaseIcon = ({
  iconName,
  buttonColor,
  htmlForId,
}: {
  iconName: string
  buttonColor?: CommonTypes.colorType
  htmlForId?: string
}): JSX.Element => {
  const { theme } = useTheme()
  let iconColor = CommonClasses.simpleThemeColorName(theme)
  if (buttonColor) {
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
