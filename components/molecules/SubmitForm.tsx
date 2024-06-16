import * as CommonTypes from "@/utils/CommonTypes"
import { MouseEvent } from "react"
import { BaseLabelButton } from "@/components/atoms/BaseLabelButton"

interface SubmitFormProps {
  htmlForId: string
  method: CommonTypes.methodType
  uri: string
  buttonLabel: string
  submitElements: React.ReactNode
  buttonColor?: CommonTypes.colorType
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const SubmitForm = ({
  htmlForId,
  method,
  uri,
  buttonLabel,
  submitElements,
  buttonColor = CommonTypes.ColorType.ACCENT,
  disabled = false,
  onClick,
}: SubmitFormProps): JSX.Element => {
  const submitButtonId = `submit-${htmlForId}`
  return (
    <>
      <form id={htmlForId} method={method} action={uri}>
        {submitElements}
        <BaseLabelButton
          htmlForId={submitButtonId}
          label={buttonLabel}
          color={buttonColor}
          disabled={disabled}
          buttonType={CommonTypes.ButtonType.SUBMIT}
          onClick={onClick}
        ></BaseLabelButton>
      </form>
    </>
  )
}

export default SubmitForm
