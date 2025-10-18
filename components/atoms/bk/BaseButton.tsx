import _ from "lodash"
import * as CommonTypes from "@/utils/CommonTypes"
import { JSX, MouseEvent } from "react"
import { tv } from "tailwind-variants"

export type ButtonColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

interface Button {
  htmlForId: string
  children: React.ReactNode
  color: ButtonColor
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  size?: CommonTypes.sizeType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  classes?: string[]
  shape?: CommonTypes.shapeType
}

export const BaseButton = ({
  htmlForId,
  children,
  color,
  onClick,
  size = CommonTypes.SizeType.SMALL,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  classes = [],
  shape = CommonTypes.ShapeType.NONE,
}: Button): JSX.Element => {
  const styleSettingClasses = tv({
    base: "btn",
    variants: {
      color: {
        [CommonTypes.ColorType.DEFAULT]: "btn-default",
        [CommonTypes.ColorType.PRIMARY]: "btn-primary",
        [CommonTypes.ColorType.SECONDARY]: "btn-secondary",
        [CommonTypes.ColorType.ACCENT]: "btn-accent",
        [CommonTypes.ColorType.NEUTRAL]: "btn-natural",
        [CommonTypes.ColorType.GHOST]: "btn-ghost",
      },
      size: {
        [CommonTypes.SizeType.LARGE]: "btn-lg",
        [CommonTypes.SizeType.MEDIUM]: "btn-md",
        [CommonTypes.SizeType.SMALL]: "btn-sm",
        [CommonTypes.SizeType.TINY]: "btn-xs",
      },
      shape: {
        [CommonTypes.ShapeType.NONE]: "",
        [CommonTypes.ShapeType.CIRCLE]: "btn-circle",
        [CommonTypes.ShapeType.SQUARE]: "btn-square",
      },
      disabled: {
        true: "btn-default no-animation",
      },
    },
  })
  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      // disabledになったら、イベントをキャンセル
      onClick(event)
    }
  }
  return (
    <button
      // fullWithやdisabledの場合、クラスを追加する
      id={htmlForId}
      className={defineClasses({ color: color, disabled: disabled, size: size, shape: shape })}
      type={buttonType}
      onClick={handleSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default BaseButton
