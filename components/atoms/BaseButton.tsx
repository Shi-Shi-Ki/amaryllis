import _ from "lodash"
import * as CommonTypes from "@/utils/CommonTypes"
import * as CommonClasses from "@/utils/CommonClasses"
import { MouseEvent } from "react"

export const BaseButton = ({
  htmlForId,
  children,
  onClick,
  color = CommonTypes.ColorType.DEFAULT,
  size = CommonTypes.SizeType.SMALL,
  buttonType = CommonTypes.ButtonType.BUTTON,
  disabled = false,
  classes = [],
  shape,
}: {
  htmlForId: string
  children: React.ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color?: CommonTypes.colorType
  size?: CommonTypes.sizeType
  buttonType?: CommonTypes.buttonType
  disabled?: boolean
  classes?: string[]
  shape?: CommonTypes.shapeType
}): JSX.Element => {
  const className = [
    "btn",
    ...(disabled ? ["no-animation", "btn-default"] : CommonClasses.buttonColorClasses(color)),
    ...CommonClasses.buttonSizeClasses(size),
    CommonClasses.buttonShapeClass(shape),
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
