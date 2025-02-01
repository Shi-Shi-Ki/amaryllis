import * as CommonTypes from "@/utils/CommonTypes"
import { ChangeEvent, JSX } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { tv } from "tailwind-variants"

export type PulldownColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT

interface PullDown {
  htmlForId: string
  options: PullDownElement[]
  color: PulldownColor
  componentSize?: CommonTypes.sizeType
  widthSize?: CommonTypes.sizeType
  hintText?: string
  register?: UseFormRegisterReturn
  errorMessage?: FieldError
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  classes?: string[]
}

export interface PullDownElement {
  element: string
  value?: string
  selected?: boolean
  disabled?: boolean
}

export const BasePullDown = ({
  htmlForId,
  options,
  color,
  componentSize = CommonTypes.SizeType.MEDIUM,
  widthSize = CommonTypes.SizeType.TINY,
  hintText,
  register,
  errorMessage,
  onChange,
  disabled = false,
  classes = [],
}: PullDown): JSX.Element => {
  const styleSettingClasses = tv({
    base: "select w-full",
    variants: {
      color: {
        [CommonTypes.ColorType.PRIMARY]: "select-primary",
        [CommonTypes.ColorType.SECONDARY]: "select-secondary",
        [CommonTypes.ColorType.ACCENT]: "select-accent",
      },
      size: {
        [CommonTypes.SizeType.LARGE]: "select-lg",
        [CommonTypes.SizeType.MEDIUM]: "select-md",
        [CommonTypes.SizeType.SMALL]: "select-sm",
        [CommonTypes.SizeType.TINY]: "select-xs",
      },
      width: {
        [CommonTypes.SizeType.LARGE]: "max-w-lg",
        [CommonTypes.SizeType.MEDIUM]: "max-w-md",
        [CommonTypes.SizeType.SMALL]: "max-w-sm",
        [CommonTypes.SizeType.TINY]: "max-w-xs",
      },
    },
  })
  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
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
      {hintText && (
        <div className="label">
          <span className="label-text">{hintText}</span>
        </div>
      )}
      <select
        {...register}
        id={htmlForId}
        className={defineClasses({ color: color, size: componentSize, width: widthSize })}
        disabled={disabled}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {optionElements}
      </select>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage.message}</span>
        </div>
      )}
    </>
  )
}
