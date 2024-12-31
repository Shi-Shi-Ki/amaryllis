import * as CommonTypes from "@/utils/CommonTypes"
import { v7 as uuid } from "uuid"
import { JSX } from "react"
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
  iconColor?: IconColor
  htmlForId?: string
}

export const BaseIcon = ({ iconName, iconColor, htmlForId }: BaseIcon): JSX.Element => {
  const classes = tv({
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
  if (!htmlForId) {
    htmlForId = uuid()
  }

  return (
    <span id={htmlForId} className={classes({ color: iconColor })}>
      {iconName}
    </span>
  )
}
