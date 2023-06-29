"use client"
import Button from "@/components/atoms/BaseButton"
import { BaseIconButton, ColorList, IconList } from "@/components/atoms/BaseIconButton"
import BaseTextField from "@/components/atoms/BaseTextField"

export default function About() {
  const handleClick = (e) => console.log(e)
  return (
    <div>
      <h1>about page!!!</h1>
      <BaseTextField></BaseTextField>
      <BaseIconButton id={"test_button"} color={ColorList.PRIMARY} icon={IconList.ADD}></BaseIconButton>
      <Button
        color={"primary"}
        size={"large"}
        fullWidth={true}
        disabled={false}
        onClick={handleClick}
      >
        dummy
      </Button>
    </div>
  )
}
