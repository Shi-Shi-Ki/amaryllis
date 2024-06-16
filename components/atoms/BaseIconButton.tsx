import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { MouseEvent } from "react"
import { useTheme } from "@/contexts/AppearanceThemeContext"

interface IconButton {
  htmlForId: string
  iconName: string
  color: CommonTypes.colorType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  shape?: CommonTypes.shapeType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const BaseIconButton = ({
  htmlForId,
  iconName,
  color = CommonTypes.ColorType.PRIMARY,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  shape = CommonTypes.ShapeType.SQUARE,
  onClick,
}: IconButton): JSX.Element => {
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }

  const buttonClass = [
    "btn",
    CommonClasses.buttonShapeClass(shape),
    ...CommonClasses.buttonColorClasses(color),
  ].join(" ")
  const disabledButtonClass = [
    "btn",
    "no-animation",
    "btn-default",
    CommonClasses.buttonShapeClass(shape),
  ].join(" ")
  const { name } = useTheme()
  const iconColor = CommonClasses.buttonIconColorClass(color, name)

  return (
    <button
      id={htmlForId}
      className={disabled ? disabledButtonClass : buttonClass}
      type={buttonType}
      onClick={handleSubmit}
    >
      <span className="material-icons" style={{ color: iconColor }}>
        {iconName}
      </span>
    </button>
  )
}

export default BaseIconButton
