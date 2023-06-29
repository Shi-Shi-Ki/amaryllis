import { MouseEvent } from "react"

export const ColorList = {
  PRIMARY: "primary",
  ACCENT: "accent",
  PLAIN: "plain"
} as const
export type color = (typeof ColorList)[keyof typeof ColorList]

export const IconList = {
  ADD: "add",
  CLOSE: "close",
  DONE: "done"
} as const
export type icon = (typeof IconList)[keyof typeof IconList]

const base = "mdl-button mdl-js-button mdl-button--fab"
const withRippleEffect = `${base} mdl-js-ripple-effect`
const classMap = new Map<string, string>([
  [ColorList.PRIMARY, `${withRippleEffect} mdl-button--primary`],
  [ColorList.ACCENT, `${withRippleEffect} mdl-button--accent`],
  [ColorList.PLAIN, withRippleEffect]
]) || []

export const BaseIconButton = ({
  id,
  color = ColorList.PRIMARY,
  icon = IconList.ADD,
  disabled = false,
  onClick
}: {
  id: string
  color: color
  icon: icon
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => {
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }
  const className = () => {
    if (disabled) {
      return base
    }
    return classMap.get(color)
  }
  const materialIcon = () => {
    return icon
  }

  return (
    <button
      id={id}
      className={className()}
      onClick={clickHandler} disabled={disabled}>
      <i className="material-icons">{materialIcon()}</i>
    </button>
  )
}

export default BaseIconButton