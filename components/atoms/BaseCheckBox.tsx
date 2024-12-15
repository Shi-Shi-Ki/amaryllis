import * as CommonTypes from "@/utils/CommonTypes"
import { ChangeEvent } from "react"
import { tv } from "tailwind-variants"

export type CheckBoxColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

export interface CheckBox {
  htmlForId: string
  color: CheckBoxColor
  label: string
  value: string
  isDefaultChecked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  size?: CommonTypes.sizeType
  disabled?: boolean
  classes?: string[]
}

export const BaseCheckBox = ({
  htmlForId,
  color,
  label,
  value,
  isDefaultChecked = false,
  onChange,
  size = CommonTypes.SizeType.MEDIUM,
  disabled = false,
  classes = [],
}: CheckBox): JSX.Element => {
  const styleSettingClasses = tv({
    base: "checkbox",
    variants: {
      color: {
        [CommonTypes.ColorType.DEFAULT]: "checkbox-default",
        [CommonTypes.ColorType.PRIMARY]: "checkbox-primary",
        [CommonTypes.ColorType.SECONDARY]: "checkbox-secondary",
        [CommonTypes.ColorType.ACCENT]: "checkbox-accent",
        [CommonTypes.ColorType.NEUTRAL]: "checkbox-natural",
        [CommonTypes.ColorType.GHOST]: "checkbox-ghost",
      },
      size: {
        [CommonTypes.SizeType.LARGE]: "checkbox-lg",
        [CommonTypes.SizeType.MEDIUM]: "checkbox-md",
        [CommonTypes.SizeType.SMALL]: "checkbox-sm",
        [CommonTypes.SizeType.TINY]: "checkbox-xs",
      },
      disabled: {
        true: "checkbox-default no-animation",
      },
    },
  })

  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event)
    }
  }

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{label}</span>
          <input
            id={htmlForId}
            type="checkbox"
            value={value}
            defaultChecked={isDefaultChecked}
            className={defineClasses({ color: color, size: size, disabled: disabled })}
            onChange={onChangeHandler}
            disabled={disabled}
          />
        </label>
      </div>
    </>
  )
}
