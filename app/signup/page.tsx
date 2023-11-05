"use client"
import { BaseIconButton, ColorList, IconList } from "@/components/atoms/BaseIconButton"
import { BaseTextField, TextTypeList } from "@/components/atoms/BaseTextField"

export default function About() {
  return (
    <>
      <h1>about page!!!</h1>
      <div>
        <BaseTextField
          label="your_mail_address"
          textType={TextTypeList.TEXT}
          htmlForId="text"
        ></BaseTextField>
        <BaseTextField
          label="password"
          textType={TextTypeList.PASSWORD}
          htmlForId="password"
        ></BaseTextField>
      </div>
    </>
  )
}
