import * as CommonTypes from "@/utils/CommonTypes"
import { ChangeEvent, JSX } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { tv } from "tailwind-variants"

export type PulldownColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT

interface IPullDown extends React.ComponentPropsWithoutRef<"select"> {
  options: PullDownElement[]
  colorType: PulldownColor
  register?: UseFormRegisterReturn
  componentSize?: CommonTypes.sizeType
  widthSize?: CommonTypes.sizeType
  hintText?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

export interface PullDownElement {
  element: string
  value?: string
  selected?: boolean
  disabled?: boolean
}

const PullDown = ({
  options,
  colorType,
  register,
  componentSize = CommonTypes.SizeType.MEDIUM,
  widthSize = CommonTypes.SizeType.TINY,
  hintText,
  onChange,
  disabled = false,
  ...props
}: IPullDown): JSX.Element => {
  const styleSettingClasses = tv({
    base: "select w-full",
    variants: {
      colorType: {
        [CommonTypes.ColorType.PRIMARY]: "select-primary",
        [CommonTypes.ColorType.SECONDARY]: "select-secondary",
        [CommonTypes.ColorType.ACCENT]: "select-accent",
      },
      sizeType: {
        [CommonTypes.SizeType.LARGE]: "select-lg",
        [CommonTypes.SizeType.MEDIUM]: "select-md",
        [CommonTypes.SizeType.SMALL]: "select-sm",
        [CommonTypes.SizeType.TINY]: "select-xs",
      },
      widthType: {
        [CommonTypes.SizeType.LARGE]: "max-w-lg",
        [CommonTypes.SizeType.MEDIUM]: "max-w-md",
        [CommonTypes.SizeType.SMALL]: "max-w-sm",
        [CommonTypes.SizeType.TINY]: "max-w-xs",
      },
    },
  })

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange && !disabled) {
      onChange(event)
    }
  }

  let defaultValue = ""
  const optionElements = options.map((e, idx) => {
    const value = e.value ?? e.element
    if (e.selected) {
      defaultValue = value
    }
    return (
      <option key={idx} value={value} disabled={e.disabled}>
        {e.element}
      </option>
    )
  })

  return (
    <>
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <select
          {...register}
          className={styleSettingClasses({
            colorType: colorType,
            sizeType: componentSize,
            widthType: widthSize,
          })}
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
          {...props}
        >
          {optionElements}
        </select>
      </fieldset>
    </>
  )
}

export default PullDown
