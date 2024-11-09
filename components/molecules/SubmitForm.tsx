import * as CommonTypes from "@/utils/CommonTypes"
import { MouseEvent } from "react"
import { BaseButton, ButtonColor } from "@/components/atoms/BaseButton"

interface SubmitFormProps {
  htmlForId: string
  method: CommonTypes.methodType
  uri: string
  submitElements: React.ReactNode
  buttonColor: ButtonColor
  disabled?: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const SubmitForm = ({
  htmlForId,
  method,
  uri,
  submitElements,
  buttonColor,
  disabled = false,
  onClick,
}: SubmitFormProps): JSX.Element => {
  const submitButtonId = `submit-${htmlForId}`
  return (
    <>
      <form id={htmlForId} method={method} action={uri}>
        {submitElements}
        <BaseButton
          htmlForId={submitButtonId}
          color={buttonColor}
          disabled={disabled}
          buttonType={CommonTypes.ButtonType.SUBMIT}
          onClick={onClick}
        >
          submit
        </BaseButton>
      </form>
    </>
  )
}

export default SubmitForm
