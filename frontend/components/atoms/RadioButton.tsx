import * as CommonTypes from "@/utils/CommonTypes"
import { ChangeEvent, JSX } from "react"
import { tv } from "tailwind-variants"

export type RadioButtonColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.DEFAULT
  | typeof CommonTypes.ColorType.NEUTRAL

export interface IRadioButton extends React.ComponentPropsWithoutRef<"input"> {
  colorType: RadioButtonColor
  label: string
  value: string
  isDefaultChecked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  sizeType?: CommonTypes.sizeType
  disabled?: boolean
}

const RadioButton = ({
  colorType,
  label,
  value,
  isDefaultChecked = false,
  onChange,
  sizeType = CommonTypes.SizeType.MEDIUM,
  disabled = false,
  ...props
}: IRadioButton): JSX.Element => {
  const styleSettingClasses = tv({
    base: "radio",
    variants: {
      colorType: {
        [CommonTypes.ColorType.DEFAULT]: "radio-default",
        [CommonTypes.ColorType.PRIMARY]: "radio-primary",
        [CommonTypes.ColorType.SECONDARY]: "radio-secondary",
        [CommonTypes.ColorType.ACCENT]: "radio-accent",
        [CommonTypes.ColorType.NEUTRAL]: "radio-natural",
        [CommonTypes.ColorType.GHOST]: "radio-ghost",
      },
      sizeType: {
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

  return (
    <>
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="radio"
          value={value}
          onChange={onChangeHandler}
          className={styleSettingClasses({
            colorType: colorType,
            sizeType: sizeType,
            disabled: disabled,
          })}
          disabled={disabled}
          defaultChecked={isDefaultChecked}
          {...props}
        />
      </label>
    </>
  )
}

export default RadioButton
