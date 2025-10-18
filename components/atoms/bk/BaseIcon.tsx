import * as CommonTypes from "@/utils/CommonTypes"
import { v7 as uuid } from "uuid"
import { JSX, MouseEvent } from "react"
import { tv } from "tailwind-variants"

export type IconColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

interface BaseIcon {
  iconName: string
  htmlForId?: string
  classes?: string[]
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void
  disabled?: boolean
  iconColor?: IconColor
}

export const BaseIcon = ({
  iconName,
  htmlForId,
  classes = [],
  onClick = () => {},
  disabled = false,
  iconColor,
}: BaseIcon): JSX.Element => {
  const styleSettingClasses = tv({
    base: "material-icons",
    variants: {
      color: {
        [CommonTypes.ColorType.DEFAULT]: "text-default-content",
        [CommonTypes.ColorType.PRIMARY]: "text-primary-content",
        [CommonTypes.ColorType.SECONDARY]: "text-secondary-content",
        [CommonTypes.ColorType.ACCENT]: "text-accent-content",
        [CommonTypes.ColorType.NEUTRAL]: "text-natural-content",
        [CommonTypes.ColorType.GHOST]: "text-ghost-content",
      },
    },
  })
  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })
  const handleSubmit = (event: MouseEvent<HTMLSpanElement>) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }
  if (!htmlForId) {
    htmlForId = uuid()
  }

  return (
    <span id={htmlForId} className={defineClasses({ color: iconColor })} onClick={handleSubmit}>
      {iconName}
    </span>
  )
}
