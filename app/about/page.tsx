"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { BaseButton } from "@/components/atoms/BaseButton"
import { BaseIconButton } from "@/components/atoms/BaseIconButton"

export default function About() {
  return (
    <>
      <h1>about page!!!</h1>
      <BaseButton
        htmlForId="base-button"
        color={CommonTypes.ColorType.OUTLINE_ACCENT}
        size={CommonTypes.SizeType.MEDIUM}
        // classes={["btn-secondary"]}
      >
        test
      </BaseButton>
      <BaseIconButton
        htmlForId="base-icon-button"
        iconName="home"
        color={CommonTypes.ColorType.SECONDARY}
      />
    </>
  )
}
