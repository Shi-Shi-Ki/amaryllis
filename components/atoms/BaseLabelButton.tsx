import { MouseEvent } from "react"

interface LabelButton {
  htmlForId: string
  label: string
  color: color
  disabled?: boolean
  buttonType?: labelButtonType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
export const ColorList = {
  PRIMARY: "primary",
  ACCENT: "accent",
  PLAIN: "plain",
} as const
export type color = (typeof ColorList)[keyof typeof ColorList]

export const LabelButtonType = {
  BUTTON: "button",
  SUBMIT: "submit",
} as const
export type labelButtonType = (typeof LabelButtonType)[keyof typeof LabelButtonType]

export const BaseLabelButton = ({
  htmlForId,
  label,
  color,
  disabled = false,
  buttonType = LabelButtonType.BUTTON,
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
