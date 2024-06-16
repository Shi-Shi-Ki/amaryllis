import * as CommonTypes from "@/utils/CommonTypes"
import { MouseEvent } from "react"

interface LabelButton {
  htmlForId: string
  label: string
  color: CommonTypes.colorType
  disabled?: boolean
  buttonType?: CommonTypes.buttonType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const BaseLabelButton = ({
  htmlForId,
  label,
  color,
  disabled = false,
  buttonType = CommonTypes.ButtonType.BUTTON,
  onClick,
}: LabelButton): JSX.Element => {
  const buttonClass = `mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--${color}`
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }
  return (
    <button
      id={htmlForId}
      type={buttonType}
      className={buttonClass}
      onClick={clickHandler}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default BaseLabelButton
