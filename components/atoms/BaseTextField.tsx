import * as CommonTypes from "@/utils/CommonTypes"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"
import * as CommonClasses from "@/utils/CommonClasses"

interface TextField {
  register: UseFormRegisterReturn
  htmlForId: string
  color: CommonTypes.colorType
  widthSize?: CommonTypes.sizeType
  placeholder?: string
  errorMessage?: FieldError
  disabled?: boolean
  hintText?: string
  textType?: CommonTypes.textType
}

export const BaseTextField = ({
  register,
  errorMessage,
  placeholder,
  htmlForId,
  widthSize = CommonTypes.SizeType.SMALL,
  color,
  disabled = false,
  hintText,
  textType = CommonTypes.TextType.TEXT,
}: TextField): JSX.Element => {
  const classNames = [
    "input input-bordered flex items-center gap-2 w-full max-w-xs",
    CommonClasses.inputWidthSizeClasses(widthSize),
    CommonClasses.inputColorClasses(color),
  ].join(" ")
  return (
    <>
      {hintText && (
        <div className="label">
          <span className="label-text">{hintText}</span>
        </div>
      )}
      <label className={classNames}>
        <input
          {...register}
          id={htmlForId}
          type={textType}
          placeholder={placeholder}
          className="grow"
          disabled={disabled}
        />
      </label>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage.message}</span>
        </div>
      )}
    </>
  )
}

export default BaseTextField
