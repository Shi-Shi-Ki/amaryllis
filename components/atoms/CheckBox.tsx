import React from "react"
import * as CommonTypes from "@/utils/CommonTypes"
import { tv } from "tailwind-variants"

export type CheckBoxColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT

interface ICheckBox extends React.ComponentPropsWithoutRef<"input"> {
  colorType: CheckBoxColor
  label: string
  value: string
  isDefaultChecked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  sizeType?: CommonTypes.sizeType
  disabled?: boolean
}

const CheckBox = ({
  colorType,
  label,
  value,
  isDefaultChecked,
  onChange,
  sizeType = CommonTypes.SizeType.MEDIUM,
  disabled = false,
  ...props
}: ICheckBox): React.JSX.Element => {
  const baseStyle = tv({
    base: "checkbox",
    variants: {
      colorType: {
        [CommonTypes.ColorType.PRIMARY]: "checkbox-primary",
        [CommonTypes.ColorType.SECONDARY]: "checkbox-secondary",
        [CommonTypes.ColorType.ACCENT]: "checkbox-accent",
        [CommonTypes.ColorType.DEFAULT]: "checkbox-default",
        [CommonTypes.ColorType.GHOST]: "checkbox-ghost",
      },
      sizeType: {
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

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event)
    }
  }

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          value={value}
          defaultChecked={isDefaultChecked}
          className={baseStyle({ colorType: colorType, sizeType: sizeType, disabled: disabled })}
          onChange={onChangeHandler}
          disabled={disabled}
          {...props}
        />
        {label}
      </label>
    </div>
  )
}

export default CheckBox
