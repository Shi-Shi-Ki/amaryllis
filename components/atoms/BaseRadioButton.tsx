import * as CommonTypes from "@/utils/CommonTypes"
import { ChangeEvent } from "react"
import { tv } from "tailwind-variants"

export type RadioButtonColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

export interface RadioButton {
  htmlForId: string
  color: RadioButtonColor
  label: string
  value: string
  name: string
  isDefaultChecked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  size?: CommonTypes.sizeType
  disabled?: boolean
  classes?: string[]
}

export const BaseRadioButton = ({
  htmlForId,
  color,
  label,
  value,
  name,
  isDefaultChecked = false,
  onChange,
  size = CommonTypes.SizeType.MEDIUM,
  disabled = false,
  classes = [],
}: RadioButton): JSX.Element => {
  const styleSettingClasses = tv({
    base: "radio",
    variants: {
      color: {
        [CommonTypes.ColorType.DEFAULT]: "radio-default",
        [CommonTypes.ColorType.PRIMARY]: "radio-primary",
        [CommonTypes.ColorType.SECONDARY]: "radio-secondary",
        [CommonTypes.ColorType.ACCENT]: "radio-accent",
        [CommonTypes.ColorType.NEUTRAL]: "radio-natural",
        [CommonTypes.ColorType.GHOST]: "radio-ghost",
      },
      size: {
        [CommonTypes.SizeType.LARGE]: "radio-lg",
        [CommonTypes.SizeType.MEDIUM]: "radio-md",
        [CommonTypes.SizeType.SMALL]: "radio-sm",
        [CommonTypes.SizeType.TINY]: "radio-xs",
      },
      disabled: {
        true: "radio-default no-animation",
      },
    },
  })

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event)
    }
  }

  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })

  return (
    <>
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="radio"
          id={htmlForId}
          value={value}
          name={name}
          onChange={onChangeHandler}
          className={defineClasses({ color: color, size: size, disabled: disabled })}
          disabled={disabled}
          defaultChecked={isDefaultChecked}
        />
      </label>
    </>
  )
}
