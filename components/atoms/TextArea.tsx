import * as CommonTypes from "@/utils/CommonTypes"
import { JSX } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { tv } from "tailwind-variants"

export type TextAreaColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.ERROR

interface ITextArea extends React.ComponentPropsWithoutRef<"textarea"> {
  register: UseFormRegisterReturn
  colorType: TextAreaColor
  componentSizeType?: CommonTypes.sizeType
  widthSizeType?: CommonTypes.sizeType
  placeholder?: string
  rows?: number
  disabled?: boolean
  hintText?: string
}

const TextArea = ({
  register,
  colorType,
  componentSizeType = CommonTypes.SizeType.MEDIUM,
  widthSizeType = CommonTypes.SizeType.MEDIUM,
  placeholder,
  rows = 3,
  disabled = false,
  hintText,
  ...props
}: ITextArea): JSX.Element => {
  const baseStyle = tv({
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

  return (
    <>
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <textarea
          {...register}
          placeholder={placeholder}
          className={baseStyle({
            color: colorType,
            componentSize: componentSizeType,
            widthSize: widthSizeType,
          })}
          rows={rows}
          disabled={disabled}
          {...props}
        ></textarea>
      </fieldset>
    </>
  )
}

export default TextArea
