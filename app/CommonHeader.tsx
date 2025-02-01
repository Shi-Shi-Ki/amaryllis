"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { signOut } from "next-auth/react"
import { BaseIcon } from "@/components/atoms/BaseIcon"
import BaseButton from "@/components/atoms/BaseButton"

export const CommonHeader = () => {
  return (
    <>
      <BaseButton
        htmlForId="signout"
        color={CommonTypes.ColorType.DEFAULT}
        onClick={() => signOut()}
        shape={CommonTypes.ShapeType.CIRCLE}
        classes={["m-2"]}
      >
        <BaseIcon htmlForId="logout" iconName="logout" />
      </BaseButton>
    </>
  )
}
