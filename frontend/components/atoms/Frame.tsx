import React from "react"
import { tv } from "tailwind-variants"
import * as CommonTypes from "@/utils/CommonTypes"
import { match } from "ts-pattern"

export type BorderColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

interface IFrame extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode
  colorType: BorderColor
  widthSize?: CommonTypes.sizeType
}

const Frame = ({ children, colorType, widthSize, ...props }: IFrame): React.JSX.Element => {
  const presetWidthSize = (width: CommonTypes.sizeType | undefined) =>
    match<CommonTypes.sizeType | undefined, React.CSSProperties>(width)
      .with(CommonTypes.SizeType.TINY, () => ({ width: 380 }))
      .with(CommonTypes.SizeType.SMALL, () => ({ width: 450 }))
      .with(CommonTypes.SizeType.MEDIUM, () => ({ width: 520 }))
      .with(CommonTypes.SizeType.LARGE, () => ({ width: 590 }))
      .otherwise(() => ({}))

  const styleSettingClasses = tv({
    base: "rounded-lg p-5 outline outline-5",
    variants: {
      colorType: {
        [CommonTypes.ColorType.DEFAULT]: "outline-default",
        [CommonTypes.ColorType.PRIMARY]: "outline-primary",
        [CommonTypes.ColorType.SECONDARY]: "outline-secondary",
        [CommonTypes.ColorType.ACCENT]: "outline-accent",
        [CommonTypes.ColorType.NEUTRAL]: "outline-natural",
        [CommonTypes.ColorType.GHOST]: "outline-ghost",
      },
    },
  })

  return (
    <div
      className={styleSettingClasses({ colorType: colorType })}
      style={presetWidthSize(widthSize)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Frame
