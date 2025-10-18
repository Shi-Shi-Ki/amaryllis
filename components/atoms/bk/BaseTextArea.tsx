import * as CommonTypes from "@/utils/CommonTypes"
import { JSX } from "react"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"
import { tv } from "tailwind-variants"

export type TextAreaColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.ERROR

interface TextArea {
  htmlForId: string
  register: UseFormRegisterReturn
  color: TextAreaColor
  componentSize?: CommonTypes.sizeType
  widthSize?: CommonTypes.sizeType
  placeholder?: string
  rows?: number
  errorMessage?: FieldError
  disabled?: boolean
  hintText?: string
  classes?: string[]
}

export const BaseTextArea = ({
  htmlForId,
  register,
  color,
  componentSize = CommonTypes.SizeType.MEDIUM,
  widthSize = CommonTypes.SizeType.MEDIUM,
  errorMessage,
  placeholder,
  rows = 3,
  disabled = false,
  hintText,
  classes = [],
}: TextArea): JSX.Element => {
  const styleSettingClasses = tv({
    base: "textarea textarea-bordered w-full",
    variants: {
      color: {
        [CommonTypes.ColorType.PRIMARY]: "textarea-primary",
        [CommonTypes.ColorType.SECONDARY]: "textarea-secondary",
        [CommonTypes.ColorType.ACCENT]: "textarea-accent",
        [CommonTypes.ColorType.GHOST]: "textarea-ghost",
        [CommonTypes.ColorType.ERROR]: "textarea-error",
      },
      componentSize: {
        [CommonTypes.SizeType.LARGE]: "textarea-lg",
        [CommonTypes.SizeType.MEDIUM]: "textarea-md",
        [CommonTypes.SizeType.SMALL]: "textarea-sm",
        [CommonTypes.SizeType.TINY]: "textarea-xs",
      },
      widthSize: {
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

  return (
    <>
      {hintText && (
        <div className="label">
          <span className="label-text">{hintText}</span>
        </div>
      )}
      <label>
        <textarea
          {...register}
          id={htmlForId}
          placeholder={placeholder}
          className={defineClasses({
            color: color,
            componentSize: componentSize,
            widthSize: widthSize,
          })}
          rows={rows}
          disabled={disabled}
        ></textarea>
      </label>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage.message}</span>
        </div>
      )}
    </>
  )
}
