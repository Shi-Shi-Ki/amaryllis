import * as CommonTypes from "@/utils/CommonTypes"
import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { tv } from "tailwind-variants"

export type TextFieldColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST

interface ITextField extends React.ComponentPropsWithoutRef<"input"> {
  register: UseFormRegisterReturn
  colorType: TextFieldColor
  componentSizeType?: CommonTypes.sizeType
  widthSizeType?: CommonTypes.sizeType
  placeholder?: string
  disabled?: boolean
  hintText?: string
  textType?: CommonTypes.textType
}

const TextField = ({
  register,
  colorType,
  componentSizeType,
  widthSizeType = CommonTypes.SizeType.MEDIUM,
  placeholder,
  disabled,
  hintText,
  textType,
  ...props
}: ITextField): React.JSX.Element => {
  const widthSizeList = {
    [CommonTypes.SizeType.LARGE]: "max-w-lg",
    [CommonTypes.SizeType.MEDIUM]: "max-w-md",
    [CommonTypes.SizeType.SMALL]: "max-w-sm",
    [CommonTypes.SizeType.TINY]: "max-w-xs",
  }

  const styleSettingClasses = tv({
    base: "input input-bordered flex items-center gap-2 w-full",
    variants: {
      colorType: {
        [CommonTypes.ColorType.PRIMARY]: "input-primary",
        [CommonTypes.ColorType.SECONDARY]: "input-secondary",
        [CommonTypes.ColorType.ACCENT]: "input-accent",
        [CommonTypes.ColorType.GHOST]: "input-ghost",
      },
      componentSizeType: {
        [CommonTypes.SizeType.LARGE]: "input-lg",
        [CommonTypes.SizeType.MEDIUM]: "input-md",
        [CommonTypes.SizeType.SMALL]: "input-sm",
        [CommonTypes.SizeType.TINY]: "input-xs",
      },
      widthSize: widthSizeList,
    },
  })

  return (
    <>
      <label className={"form-control w-full" + widthSizeList[widthSizeType]}>
        <div className="label py-3">
          {hintText && <span className="label-text">{hintText}</span>}
        </div>
        <input
          {...register}
          type={textType}
          placeholder={placeholder}
          className={styleSettingClasses({
            colorType: colorType,
            componentSizeType: componentSizeType,
            widthSize: widthSizeType,
          })}
          disabled={disabled}
          {...props}
        />
      </label>
    </>
  )
}

export default TextField
