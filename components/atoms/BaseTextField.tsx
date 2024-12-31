import * as CommonTypes from "@/utils/CommonTypes"
import { JSX } from "react"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"
import { tv } from "tailwind-variants"
import { match } from "ts-pattern"

export type TextFieldColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST
  | typeof CommonTypes.ColorType.SUCCESS
  | typeof CommonTypes.ColorType.WARNING
  | typeof CommonTypes.ColorType.ERROR

interface TextField {
  register: UseFormRegisterReturn
  htmlForId: string
  color: TextFieldColor
  componentSize?: CommonTypes.sizeType
  widthSize?: CommonTypes.sizeType
  placeholder?: string
  errorMessage?: FieldError
  disabled?: boolean
  hintText?: string
  textType?: CommonTypes.textType
  classes?: string[]
}

export const BaseTextField = ({
  register,
  htmlForId,
  color,
  componentSize = CommonTypes.SizeType.MEDIUM,
  widthSize = CommonTypes.SizeType.MEDIUM,
  errorMessage,
  placeholder,
  disabled = false,
  hintText,
  textType = CommonTypes.TextType.TEXT,
  classes = [],
}: TextField): JSX.Element => {
  const widthSizeList = {
    [CommonTypes.SizeType.LARGE]: "max-w-lg",
    [CommonTypes.SizeType.MEDIUM]: "max-w-md",
    [CommonTypes.SizeType.SMALL]: "max-w-sm",
    [CommonTypes.SizeType.TINY]: "max-w-xs",
  }
  const styleSettingClasses = tv({
    base: "input input-bordered flex items-center gap-2 w-full",
    variants: {
      color: {
        [CommonTypes.ColorType.PRIMARY]: "input-primary",
        [CommonTypes.ColorType.SECONDARY]: "input-secondary",
        [CommonTypes.ColorType.ACCENT]: "input-accent",
        [CommonTypes.ColorType.GHOST]: "input-ghost",
        [CommonTypes.ColorType.SUCCESS]: "input-success",
        [CommonTypes.ColorType.WARNING]: "input-warning",
        [CommonTypes.ColorType.ERROR]: "input-error",
      },
      componentSize: {
        [CommonTypes.SizeType.LARGE]: "input-lg",
        [CommonTypes.SizeType.MEDIUM]: "input-md",
        [CommonTypes.SizeType.SMALL]: "input-sm",
        [CommonTypes.SizeType.TINY]: "input-xs",
      },
      widthSize: widthSizeList,
    },
  })
  const defineClasses = tv({
    extend: styleSettingClasses,
    base: classes.join(" "),
  })
  const validationMessageColor = () => {
    return match(color)
      .with(CommonTypes.ColorType.SUCCESS, () => "text-success")
      .with(CommonTypes.ColorType.WARNING, () => "text-warning")
      .with(CommonTypes.ColorType.ERROR, () => "text-error")
      .otherwise(() => "text-error")
  }
  const validationMessageWithIcon = () => {
    const iconClassName = match(color)
      .with(CommonTypes.ColorType.SUCCESS, () => "check_circle")
      .with(CommonTypes.ColorType.WARNING, () => "warning")
      .with(CommonTypes.ColorType.ERROR, () => "dangerous")
      .otherwise(() => "")
    return iconClassName ? (
      <>
        <div className="flex items-center">
          <span className="material-icons pr-2">{iconClassName}</span>
          {errorMessage?.message}
        </div>
      </>
    ) : (
      <>{errorMessage?.message}</>
    )
  }
  return (
    <>
      <label className={"form-control w-full " + widthSizeList[widthSize]}>
        <div className="label">{hintText && <span className="label-text">{hintText}</span>}</div>
        <input
          {...register}
          id={htmlForId}
          type={textType}
          placeholder={placeholder}
          className={defineClasses({
            color: color,
            componentSize: componentSize,
            widthSize: widthSize,
          })}
          disabled={disabled}
        />
        <div className="label">
          <span className={"label-text-alt h-6 min-h-6 " + validationMessageColor()}>
            {errorMessage ? validationMessageWithIcon() : <>&nbsp;</>}
          </span>
        </div>
      </label>
    </>
  )
}

export default BaseTextField
