import * as CommonTypes from "@/utils/CommonTypes"
import React from "react"
import { FieldError } from "react-hook-form"
import { match } from "ts-pattern"

export type TextFieldColor =
  | typeof CommonTypes.ColorType.PRIMARY
  | typeof CommonTypes.ColorType.SECONDARY
  | typeof CommonTypes.ColorType.ACCENT
  | typeof CommonTypes.ColorType.GHOST

export type ValidationType =
  | typeof CommonTypes.ColorType.NONE
  | typeof CommonTypes.ColorType.SUCCESS
  | typeof CommonTypes.ColorType.WARNING
  | typeof CommonTypes.ColorType.ERROR

interface IValidation {
  fieldError?: FieldError
  validationType: ValidationType
  children: React.ReactNode
}

const Validation = ({ fieldError, validationType, children }: IValidation): React.JSX.Element => {
  const validationMessageColor = (validationType: ValidationType) => {
    return match(validationType)
      .with(CommonTypes.ColorType.SUCCESS, () => "text-success")
      .with(CommonTypes.ColorType.WARNING, () => "text-warning")
      .with(CommonTypes.ColorType.ERROR, () => "text-error")
      .otherwise(() => "")
  }

  const validationMessageWithIcon = (validationType: ValidationType, fieldError?: FieldError) => {
    const iconClassName = match(validationType)
      .with(CommonTypes.ColorType.SUCCESS, () => "check_circle")
      .with(CommonTypes.ColorType.WARNING, () => "warning")
      .with(CommonTypes.ColorType.ERROR, () => "dangerous")
      .otherwise(() => "")
    const messageIconTag =
      iconClassName.length > 0 ? <span className="material-icons pr-2">{iconClassName}</span> : ""
    return fieldError && fieldError.message ? (
      <>
        <div className="flex items-center">
          {messageIconTag}
          {fieldError.message}
        </div>
      </>
    ) : (
      <>&nbsp;</>
    )
  }

  return (
    <>
      {children}
      <div className="label py-3">
        <span className={"label-text-alt h-6 min-h-6 " + validationMessageColor(validationType)}>
          {validationMessageWithIcon(validationType, fieldError)}
        </span>
      </div>
    </>
  )
}
export default Validation
