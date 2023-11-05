import _ from "lodash"
import { MouseEvent } from "react"
import { match } from "ts-pattern"

export const SizeList = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const
export type size = (typeof SizeList)[keyof typeof SizeList]

export const ColorList = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
} as const
export type color = (typeof ColorList)[keyof typeof ColorList]

export const Button = ({
  children,
  color = ColorList.DEFAULT,
  size = SizeList.SMALL,
  fullWidth = false,
  disabled = false,
  classes = [],
  onClick,
}: {
  children: React.ReactNode
  color?: color
  size?: size
  fullWidth?: boolean
  disabled?: boolean
  classes?: string[]
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => {
  // const _color =
  //   _.head(ColorSetting.filter((map: Map) => map.key === color).map((map: Map) => map.class)) || []
  const _colorClasses = (color: color) =>
    match(color)
      .with(ColorList.PRIMARY, () => ["primary-p01", "primary-p02"])
      .otherwise(() => [])

  // const _size =
  //   _.head(SizeSetting.filter((map: Map) => map.key === size).map((map: Map) => map.class)) || []
  const _sizeClasses = (size: size) =>
    match(size)
      .with(SizeList.LARGE, () => ["size-large01", "size-large02"])
      .otherwise(() => [])

  const className = [
    "inline-flex",
    // ..._color
    ..._colorClasses(color),
    // ..._size,
    ..._sizeClasses(size),
    ...classes,
  ].join(" ")

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      // disabledになったら、イベントをキャンセル
      onClick(event)
    }
  }

  return (
    <button
      // fullWithやdisabledの場合、クラスを追加する
      className={`${className} ${fullWidth ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}
export default Button
