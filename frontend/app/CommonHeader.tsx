"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/atoms/Button"
import { useAuth } from "@/components/AuthProvider"

export const CommonHeader = () => {
  const { logout } = useAuth()

  return (
    <>
      <Button
        colorType={CommonTypes.ColorType.DEFAULT}
        onClick={() => logout()}
        shapeType={CommonTypes.ShapeType.CIRCLE}
        className={"m-2"}
      >
        <Icon iconName="logout" />
      </Button>
    </>
  )
}
