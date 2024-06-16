import * as CommonTypes from "@/utils/CommonTypes"
import { useForm, FieldValues, RegisterOptions } from "react-hook-form"

interface TextField {
  placeholder: string
  htmlForId: string
  fieldValues: FieldValues
  textType?: CommonTypes.textType
  disabled?: boolean
  validation?: RegisterOptions
}

export const BaseTextField = ({
  placeholder,
  htmlForId,
  fieldValues,
  textType = CommonTypes.TextType.TEXT,
  disabled = false,
  validation,
}: TextField): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useForm<typeof fieldValues>()
  const fieldValueKey = fieldValues.keyof

  return (
    <label className="form-control w-full max-w-xs">
      <input
        {...register(fieldValueKey, validation)}
        id={htmlForId}
        type={textType}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        disabled={disabled}
      />
      {errors.root ? (
        <div className="label">
          <span className="label-text-alt">{errors.root.message}</span>
        </div>
      ) : (
        ""
      )}
    </label>
  )
}

export default BaseTextField
