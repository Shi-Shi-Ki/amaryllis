import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { useTheme } from "@/contexts/ThemeChanger"

export const BaseIcon = ({
  iconName,
  buttonColor,
}: {
  iconName: string
  buttonColor?: CommonTypes.colorType
}): JSX.Element => {
  const { theme } = useTheme()
  let iconColor = CommonClasses.simpleThemeColorName(theme)
  if (buttonColor) {
    iconColor = CommonClasses.buttonIconColorClass(buttonColor, theme)
  }
  return (
    <span className="material-icons" style={{ color: iconColor }}>
      {iconName}
    </span>
  )
}
