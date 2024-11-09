"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { useForm, SubmitHandler } from "react-hook-form"
import { BaseButton } from "@/components/atoms/BaseButton"
import { BaseTextField } from "@/components/atoms/BaseTextField"
import { BaseIcon } from "@/components/atoms/BaseIcon"
import { BasePullDown, PullDownElement } from "@/components/atoms/BasePullDown"
import { match } from "ts-pattern"

export default function About() {
  type Inputs = {
    name: string
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const pullDownOptions = [
    {
      element: "以下から選択してください",
      value: "",
      selected: true,
      disabled: true,
    },
    {
      element: "red",
    },
    {
      element: "blue",
    },
    {
      element: "yellow",
    },
  ] as PullDownElement[]

  return (
    <>
      <h1>about page!!!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseButton
          htmlForId="base-button-primary"
          color={CommonTypes.ColorType.PRIMARY}
          size={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("primary!")
          }}
        >
          test
        </BaseButton>
        <BaseButton
          htmlForId="base-button-secondary"
          color={CommonTypes.ColorType.SECONDARY}
          size={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("secondary!")
          }}
        >
          test
        </BaseButton>
        <BaseButton
          htmlForId="base-button-accent"
          color={CommonTypes.ColorType.ACCENT}
          size={CommonTypes.SizeType.MEDIUM}
          onClick={() => {
            console.log("accent!")
          }}
        >
          test
        </BaseButton>
        <BaseButton
          htmlForId="base-icon-button"
          color={CommonTypes.ColorType.ACCENT}
          onClick={() => {}}
        >
          <BaseIcon htmlForId="home_icon" iconName="home" />
        </BaseButton>
        <BaseTextField
          register={register("name", {
            required: "名前は必須です",
            minLength: { value: 5, message: "5文字以上入力してください" },
          })}
          errorMessage={errors.name}
          htmlForId="base-text-field"
          color={match(errors.name?.type)
            .with("required", () => CommonTypes.ColorType.ERROR)
            .with("minLength", () => CommonTypes.ColorType.WARNING)
            .otherwise(() => CommonTypes.ColorType.SECONDARY)}
          placeholder="name"
          hintText="名前を入力してください"
        />
        <BasePullDown
          htmlForId="pulldown"
          options={pullDownOptions}
          color={CommonTypes.ColorType.ACCENT}
          widthSize={CommonTypes.SizeType.TINY}
        ></BasePullDown>
        <input type="submit" />
      </form>
    </>
  )
}
