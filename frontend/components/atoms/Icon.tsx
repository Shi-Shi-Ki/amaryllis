import * as CommonTypes from "@/utils/CommonTypes"
import { JSX } from "react"
import { tv } from "tailwind-variants"

export type IconColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

interface IIcon {
  iconName: string
  iconColor?: IconColor
}

const Icon = ({ iconName, iconColor, ...props }: IIcon): JSX.Element => {
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
  })

  return (
    <span className={defineClasses({ color: iconColor })} {...props}>
      {iconName}
    </span>
  )
}

export default Icon
