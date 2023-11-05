import { MouseEvent } from "react"
import { match } from "ts-pattern"

interface IconButton {
  htmlForId: string
  color: color
  icon: icon
  disabled?: boolean
  buttonType?: iconButtonType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const ColorList = {
  PRIMARY: "primary",
  ACCENT: "accent",
  PLAIN: "plain",
} as const
export type color = (typeof ColorList)[keyof typeof ColorList]

export const IconList = {
  ADD: "add",
  CLOSE: "close",
  DONE: "done",
} as const
export type icon = (typeof IconList)[keyof typeof IconList]

export const IconButtonType = {
  BUTTON: "button",
  SUBMIT: "submit",
} as const
export type iconButtonType = (typeof IconButtonType)[keyof typeof IconButtonType]

const base = "mdl-button mdl-js-button mdl-button--fab"
const withRippleEffect = `${base} mdl-js-ripple-effect`
const colorClass = (color: color) =>
  match(color)
    .with(ColorList.PRIMARY, () => `${withRippleEffect} mdl-color--orange mdl-color-text--white`)
    .with(ColorList.ACCENT, () => `${withRippleEffect} mdl-color--indigo mdl-color-text--white`)
    .with(ColorList.PLAIN, () => `${withRippleEffect} mdl-color--grey mdl-color-text--white`)
    .otherwise(() => "")

export const BaseIconButton = ({
  htmlForId,
  color = ColorList.PRIMARY,
  icon = IconList.ADD,
  disabled = false,
  buttonType = IconButtonType.BUTTON,
  onClick,
}: IconButton): JSX.Element => {
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }
  const className = () => {
    if (disabled) {
      return base
    }
    return colorClass(color)
  }
  const materialIcon = () => {
    return icon
  }

  return (
    <button
      id={htmlForId}
      type={buttonType}
      className={className()}
      onClick={clickHandler}
      disabled={disabled}
    >
      <i className="material-icons">{materialIcon()}</i>
    </button>
  )
}

export default BaseIconButton
