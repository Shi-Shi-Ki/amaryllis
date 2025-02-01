import { CSSProperties, JSX } from "react"
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

interface Frame {
  htmlForId: string
  children: React.ReactNode
  borderColor: BorderColor
  widthSize?: CommonTypes.sizeType
  classes?: string[]
}

export const BaseFrame = ({
  htmlForId,
  children,
  borderColor,
  widthSize,
  classes = [],
}: Frame): JSX.Element => {
  const presetWidthSize = (width: CommonTypes.sizeType | undefined) =>
    match<CommonTypes.sizeType | undefined, CSSProperties>(width)
      .with(CommonTypes.SizeType.TINY, () => ({ width: 380 }))
      .with(CommonTypes.SizeType.SMALL, () => ({ width: 450 }))
      .with(CommonTypes.SizeType.MEDIUM, () => ({ width: 520 }))
      .with(CommonTypes.SizeType.LARGE, () => ({ width: 590 }))
      .otherwise(() => ({}))

  const styleSettingClasses = tv({
    base: "rounded-lg p-5 outline outline-5",
    variants: {
      color: {
        [CommonTypes.ColorType.DEFAULT]: "outline-default",
        [CommonTypes.ColorType.PRIMARY]: "outline-primary",
        [CommonTypes.ColorType.SECONDARY]: "outline-secondary",
        [CommonTypes.ColorType.ACCENT]: "outline-accent",
        [CommonTypes.ColorType.NEUTRAL]: "outline-natural",
        [CommonTypes.ColorType.GHOST]: "outline-ghost",
      },
    },
  })
  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })

  return (
    <div
      id={htmlForId}
      className={defineClasses({ color: borderColor })}
      style={presetWidthSize(widthSize)}
    >
      {children}
    </div>
  )
}

export default BaseFrame
