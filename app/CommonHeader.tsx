"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { BaseIcon } from "@/components/atoms/BaseIcon"
import { BaseButton } from "@/components/atoms/BaseButton"
import { useAuth } from "@/components/AuthProvider"

export const CommonHeader = () => {
  const { logout } = useAuth()

  return (
    <>
      <BaseButton
        htmlForId="signout"
        color={CommonTypes.ColorType.DEFAULT}
        onClick={() => logout()}
        shape={CommonTypes.ShapeType.CIRCLE}
        classes={["m-2"]}
      >
        <BaseIcon htmlForId="logout" iconName="logout" />
      </BaseButton>
    </>
  )
}
