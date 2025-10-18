import React from "react"
import * as CommonTypes from "@/utils/CommonTypes"
import { tv } from "tailwind-variants"

export type ButtonColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode
  colorType: ButtonColor
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  sizeType?: CommonTypes.sizeType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  // props?: React.ComponentPropsWithoutRef<"button">
}

const Button = ({
  children,
  colorType,
  onClick,
  sizeType = CommonTypes.SizeType.SMALL,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  ...props
}: IButton): React.JSX.Element => {
  const baseStyle = tv({
    base: "btn",
    variants: {
      color: {
        [CommonTypes.ColorType.PRIMARY]: "btn-primary",
        [CommonTypes.ColorType.SECONDARY]: "btn-secondary",
        [CommonTypes.ColorType.ACCENT]: "btn-accent",
        [CommonTypes.ColorType.GHOST]: "btn-ghost",
        [CommonTypes.ColorType.DEFAULT]: "",
      },
      size: {
        [CommonTypes.SizeType.LARGE]: "btn-lg",
        [CommonTypes.SizeType.MEDIUM]: "btn-md",
        [CommonTypes.SizeType.SMALL]: "btn-sm",
        [CommonTypes.SizeType.TINY]: "btn-xs",
      },
      disabled: {
        true: "btn-default no-animation",
      },
    },
  })

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  return (
    <button
      className={baseStyle({ color: colorType, size: sizeType, disabled: disabled })}
      onClick={handleSubmit}
      type={buttonType}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
