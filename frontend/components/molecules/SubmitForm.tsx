import * as CommonTypes from "@/utils/CommonTypes"
import { JSX } from "react"
import Button, { IButton } from "@/components/atoms/Button"

interface SubmitFormProps {
  htmlForId: string
  method: CommonTypes.methodType
  uri: string
  submitElements: React.ReactNode
  completeButton: IButton
}

export const SubmitForm = ({
  htmlForId,
  method,
  uri,
  submitElements,
  completeButton,
}: SubmitFormProps): JSX.Element => {
  return (
    <>
      <form id={htmlForId} method={method} action={uri}>
        {submitElements}
        <Button {...completeButton} />
      </form>
    </>
  )
}

export default SubmitForm
