import _ from "lodash"
import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { MouseEvent } from "react"

export const BaseButton = ({
  htmlForId,
  children,
  color = CommonTypes.ColorType.DEFAULT,
  size = CommonTypes.SizeType.SMALL,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  classes = [],
  onClick,
}: {
  htmlForId: string
  children: React.ReactNode
  color?: CommonTypes.colorType
  size?: CommonTypes.sizeType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  classes?: string[]
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => {
  const className = [
    "btn",
    ...(disabled ? ["no-animation", "btn-default"] : CommonClasses.buttonColorClasses(color)),
    ...CommonClasses.buttonSizeClasses(size),
    ...classes,
  ].join(" ")

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      // disabledになったら、イベントをキャンセル
      onClick(event)
    }
  }
  return (
    <button
      // fullWithやdisabledの場合、クラスを追加する
      id={htmlForId}
      className={className}
      type={buttonType}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}
export default BaseButton
