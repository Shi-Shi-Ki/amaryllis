"use client"
import * as CommonTypes from "@/utils/CommonTypes"
import { useForm, SubmitHandler } from "react-hook-form"
import { BaseButton } from "@/components/atoms/BaseButton"
import { BaseTextField } from "@/components/atoms/BaseTextField"
import { BaseIcon } from "@/components/atoms/BaseIcon"

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

  return (
    <>
      <h1>about page!!!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseButton
          htmlForId="base-button-primary"
          color={CommonTypes.ColorType.PRIMARY}
          size={CommonTypes.SizeType.MEDIUM}
        >
          test
        </BaseButton>
        <BaseButton
          htmlForId="base-button-secondary"
          color={CommonTypes.ColorType.SECONDARY}
          size={CommonTypes.SizeType.MEDIUM}
        >
          test
        </BaseButton>
        <BaseButton
          htmlForId="base-button-accent"
          color={CommonTypes.ColorType.ACCENT}
          size={CommonTypes.SizeType.MEDIUM}
        >
          test
        </BaseButton>
        <BaseButton htmlForId="base-icon-button" color={CommonTypes.ColorType.ACCENT}>
          <BaseIcon iconName="home" />
        </BaseButton>
        <BaseTextField
          register={register("name", { required: "require name!" })}
          errorMessage={errors.name}
          htmlForId="base-text-field"
          color={CommonTypes.ColorType.SECONDARY}
          placeholder="name"
          hintText="input your full name"
        />
        <input type="submit" />
      </form>
    </>
  )
}
