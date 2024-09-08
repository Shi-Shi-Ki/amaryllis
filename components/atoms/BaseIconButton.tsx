import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { MouseEvent } from "react"

interface IconButton {
  htmlForId: string
  children: React.ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color?: CommonTypes.colorType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  shape?: CommonTypes.shapeType
}

export const BaseIconButton = ({
  htmlForId,
  children,
  onClick,
  color = CommonTypes.ColorType.PRIMARY,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  shape = CommonTypes.ShapeType.SQUARE,
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

  return (
    <button
      id={htmlForId}
      className={disabled ? disabledButtonClass : buttonClass}
      type={buttonType}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}

export default BaseIconButton
