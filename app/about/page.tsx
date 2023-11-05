"use client"
import { BaseIconButton, ColorList, IconList } from "@/components/atoms/BaseIconButton"
import { BaseTextField, TextTypeList, validation } from "@/components/atoms/BaseTextField"
import { BaseLabelButton, ColorList as ButtonColorList } from "@/components/atoms/BaseLabelButton"

export default function About() {
  const numberValidation = {
    pattern: "-?[0-9]*(.[0-9]+)?",
    error: "数値を入力してください",
  } as validation
  const emailValidation = {
    error: "メールアドレスの形式に誤りがあります",
  }
  return (
    <>
      <h1>about page!!!</h1>
      <div>
        <BaseIconButton
          htmlForId={"test_button"}
          color={ColorList.PRIMARY}
          icon={IconList.ADD}
        ></BaseIconButton>
      </div>
      <div>
        <BaseTextField
          label="number"
          htmlForId="number"
          validation={numberValidation}
        ></BaseTextField>
      </div>
      <div>
        <BaseTextField
          label="email"
          textType={TextTypeList.EMAIL}
          htmlForId="email"
          validation={emailValidation}
        ></BaseTextField>
      </div>
      <div>
        <BaseTextField
          label="password"
          textType={TextTypeList.PASSWORD}
          htmlForId="password"
        ></BaseTextField>
      </div>
      <div>
        <BaseLabelButton
          label="submit"
          color={ButtonColorList.ACCENT}
          htmlForId="submit_button"
        ></BaseLabelButton>
      </div>
    </>
  )
}
